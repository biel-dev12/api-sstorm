import { db } from "../config/db.js";

export const createCompany = async (companyData) => {
  const { compCond, fantasyName, cnpj, segment, monthValidity, userId } = companyData;

  const dtRegistered = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    // Verificar se o CNPJ já existe
    const checkCnpjQuery = `SELECT id_company FROM tb_company WHERE cd_cnpj = ?`;
    const [existingCnpj] = await db.query(checkCnpjQuery, [cnpj]);

    if (existingCnpj.length > 0) {
      throw new Error("CNPJ já cadastrado.");
    }

    // Obter o ID de `comp_cond`
    const getCompCondId = `SELECT id_comp_or_cond FROM tb_comp_or_cond WHERE nm_comp_or_cond = ?`;
    const [compCondResult] = await db.query(getCompCondId, [compCond]);
    const compCondId = compCondResult[0]?.id_comp_or_cond;

    if (!compCondId) {
      throw new Error("Tipo de empresa inválido.");
    }

    // Inserir a empresa
    const insertCompanyQuery = `
      INSERT INTO tb_company 
      (nm_comp_name, cd_cnpj, dt_registered, cd_id_user, cd_id_segment, cd_comp_or_cond, ds_month_validity) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(insertCompanyQuery, [
      fantasyName,
      cnpj,
      dtRegistered,
      userId,
      segment,
      compCondId,
      monthValidity,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(`Erro ao criar empresa: ${error.message}`);
  }
};
