import { db } from "../config/db.js";

export const createCompany = async (companyData, userId) => {
    const {compCond, fantasyName, cnpj, segment, monthValidity} = companyData

    const dtRegistered = new Date().toISOString().slice(0, 19).replace('T', ' ')

    try {
        // 1. Obter o ID de `comp_cond`
        const getCompCondId = `SELECT id_comp_or_cond FROM tb_comp_or_cond WHERE nm_comp_or_cond = ?`;
        const [compCondResult] = await db.query(getCompCondId, [compCond]);
    
        const compCondId = compCondResult[0].id_comp_or_cond;
    
        // 2. Obter o ID de `segment`
        const getSegmentId = `SELECT id_segment FROM tb_segment WHERE nm_segment = ?`;
        const [segmentResult] = await db.query(getSegmentId, [segment]);
    
        const segmentId = segmentResult[0].id_segment;
    
        // 3. Inserir a empresa
        const insertCompanyQuery = `
          INSERT INTO tb_company 
          (nm_comp_name, cd_cnpj, cd_id_user, cd_id_segment, cd_comp_or_cond, ds_month_validity, dt_registered) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(insertCompanyQuery, [
          fantasyName,
          cnpj,
          userId, // Aqui é usado o id_user do criador
          segmentId,
          compCondId,
          monthValidity,
          dtRegistered,
        ]);
    
        return result.insertId;
      } catch (error) {
        throw new Error(`Erro ao criar empresa: ${error.message}`);
      }
}