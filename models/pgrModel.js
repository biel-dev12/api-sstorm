import { db } from "../config/db.js";

export const updatePgrData = async (idPgr, cd_company_id, data) => {
  try {
    const query = `
      UPDATE tb_pgr_pcmso
      SET
        dt_release = ?,
        dt_contele = ?,
        dt_basic_doc = ?,
        dt_inspection = ?,
        dt_definitive_doc = ?,
        dt_submission_doc = ?,
        ds_obs = ?,
        cd_id_contele_tec = ?,
        cd_id_bas_doc_tec = ?,
        cd_id_insp_tec = ?,
        cd_id_def_doc_tec = ?,
        cd_id_sub_tec = ?,
        ds_type_inspection = ?,
        cd_id_type_service = ?
      WHERE id_pgr_pcmso = ? AND cd_id_company_doc = ?;
    `;


    const values = [
      data.dt_release,
      data.dt_contele,
      data.dt_basic_doc,
      data.dt_inspection,
      data.dt_definitive_doc,
      data.dt_submission_doc,
      data.ds_obs,
      data.cd_id_contele_tec,
      data.cd_id_bas_doc_tec,
      data.cd_id_insp_tec,
      data.cd_id_def_doc_tec,
      data.cd_id_sub_tec,
      data.ds_type_inspection,
      data.cd_id_type_service,
      idPgr,
      cd_company_id, // Garante que a atualização seja feita apenas para a empresa correta
    ];

    const [result] = await db.query(query, values);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Erro ao atualizar PGR:", error.message);
    throw new Error("Erro ao atualizar os dados do PGR.");
  }
};

export const getPgrByCompany = async (companyId) => {
  const query = `SELECT * FROM tb_pgr_pcmso WHERE cd_id_company_doc = ?`;
  const [rows] = await db.query(query, [companyId]);
  return rows;
}
