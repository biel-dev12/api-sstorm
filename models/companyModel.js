import { db } from "../config/db.js";

export const findByField = async (field, value) => {
  const query = `SELECT * FROM tb_company WHERE ?? = ?`;
  const [rows] = await db.query(query, [field, value]);
  return rows;
};

export const createCompany = async (companyData) => {
  const { compCond, fantasyName, cnpj, segment, monthValidity, userId } =
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
      `INSERT INTO tb_company (nm_comp_name, cd_cnpj, dt_registered, cd_id_user, cd_id_segment, cd_comp_or_cond, ds_month_validity) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fantasyName,
        cnpj,
        dtRegistered,
        userId,
        segment,
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
  const { compCond, fantasyName, cnpj, segment, monthValidity, userId } =
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
        cd_comp_or_cond = (SELECT id_comp_or_cond FROM tb_comp_or_cond WHERE nm_comp_or_cond = ?), 
        ds_month_validity = ? 
      WHERE id_company = ?
    `;

    const [result] = await db.query(updateQuery, [
      fantasyName,
      cnpj,
      userId,
      segment,
      compCond,
      monthValidity,
      companyId,
    ]);

    return result;
  } catch (error) {
    throw new Error(`Erro ao atualizar empresa: ${error.message}`);
  }
};
