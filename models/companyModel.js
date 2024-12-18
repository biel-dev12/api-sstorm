import { db } from "../config/db.js";

export const findByField = async (field, value) => {
  const query = `SELECT * FROM tb_company WHERE ?? = ?`;
  const [rows] = await db.query(query, [field, value]);
  return rows;
};

export const createCompany = async (companyData) => {
  const { compCond, fantasyName, cnpj, segment, city, monthValidity, userId } =
    companyData;
  const dtRegistered = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const [existingCompany] = await db.query(
      `SELECT id_company FROM tb_company WHERE nm_comp_name = ? OR cd_cnpj = ?`,
      [fantasyName, cnpj]
    );
    if (existingCompany.length > 0) {
      throw new Error("Nome ou CNPJ já cadastrado.");
    }

    const [compCondResult] = await db.query(
      `SELECT id_comp_or_cond FROM tb_comp_or_cond WHERE nm_comp_or_cond = ?`,
      [compCond]
    );
    const compCondId = compCondResult[0]?.id_comp_or_cond;
    if (!compCondId) {
      throw new Error("Tipo de empresa inválido.");
    }

    const [result] = await db.query(
      `INSERT INTO tb_company (nm_comp_name, cd_cnpj, dt_registered, cd_id_user, cd_id_segment, cd_id_city, cd_comp_or_cond, ds_month_validity) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fantasyName,
        cnpj,
        dtRegistered,
        userId,
        segment,
        city,
        compCondId,
        monthValidity,
      ]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(`Erro ao criar empresa: ${error.message}`);
  }
};

export const updateCompany = async (companyId, companyData) => {
  const { compCond, fantasyName, cnpj, segment, city, monthValidity, userId } =
    companyData;

  try {
    // Verificar se o CNPJ já existe para outra empresa
    const checkCnpjQuery = `
      SELECT id_company 
      FROM tb_company 
      WHERE cd_cnpj = ? AND id_company != ?
    `;
    const [existingCnpj] = await db.query(checkCnpjQuery, [cnpj, companyId]);

    if (existingCnpj.length > 0) {
      throw new Error("CNPJ já cadastrado.");
    }

    // Verificar se o nome já existe para outra empresa
    const checkNameQuery = `
      SELECT id_company 
      FROM tb_company 
      WHERE nm_comp_name = ? AND id_company != ?
    `;
    const [existingName] = await db.query(checkNameQuery, [
      fantasyName,
      companyId,
    ]);

    if (existingName.length > 0) {
      throw new Error("Nome já cadastrado.");
    }

    // Atualizar empresa
    const updateQuery = `
      UPDATE tb_company 
      SET 
        nm_comp_name = ?, 
        cd_cnpj = ?, 
        cd_id_user = ?, 
        cd_id_segment = ?, 
        cd_id_city = ?,
        cd_comp_or_cond = (SELECT id_comp_or_cond FROM tb_comp_or_cond WHERE nm_comp_or_cond = ?), 
        ds_month_validity = ? 
      WHERE id_company = ?
    `;

    const [result] = await db.query(updateQuery, [
      fantasyName,
      cnpj,
      userId,
      segment,
      city,
      compCond,
      monthValidity,
      companyId,
    ]);

    return result;
  } catch (error) {
    throw new Error(`Erro ao atualizar empresa: ${error.message}`);
  }
};

export const deleteCompany = async (companyId) => {
  const query = "DELETE FROM tb_company WHERE id_company = ?"

  try {
    const [result] = await db.query(query, [companyId]);
    return result.affectedRows;
  } catch (error) {
    throw new Error("Erro ao deletar empresa.");
  }
}

export const compByMonth = async (month) => {
  const query = `SELECT 
      c.id_company, 
      c.nm_comp_name, 
      c.cd_cnpj, 
      ci.sg_city, 
      s.nm_segment, 
      ec.nm_comp_or_cond,
      c.ds_month_validity 
    FROM tb_company c
    JOIN tb_city ci ON c.cd_id_city = ci.id_city
    JOIN tb_segment s ON c.cd_id_segment = s.id_segment
    JOIN tb_comp_or_cond ec ON c.cd_comp_or_cond = ec.id_comp_or_cond
    WHERE c.ds_month_validity = ?`

  const [rows] = await db.query(query, [month])

  return rows
}