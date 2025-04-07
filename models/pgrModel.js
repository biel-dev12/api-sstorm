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
};

export const getPgrByMonth = async (month) => {
  try {
    const query = `
        SELECT
           p.id_pgr_pcmso, p.dt_release, p.dt_contele, p.dt_basic_doc, p.dt_inspection, p.dt_definitive_doc, p.dt_submission_doc, p.ds_type_inspection, p.ds_obs,
           c.nm_comp_name, c.ds_month_validity, c.nm_neighborhood AS neighb,
           t1.nm_tec AS resp_contele,
           t2.nm_tec AS resp_basic_doc,
           t3.nm_tec AS resp_inspection,
           t4.nm_tec AS resp_definitive_doc,
           t5.nm_tec AS resp_submission_doc,
           ct.sg_city
        FROM tb_pgr_pcmso p
        JOIN tb_company c ON p.cd_id_company_doc = c.id_company
        LEFT JOIN tb_tec t1 ON p.cd_id_contele_tec = t1.id_tec
        LEFT JOIN tb_tec t2 ON p.cd_id_bas_doc_tec = t2.id_tec
        LEFT JOIN tb_tec t3 ON p.cd_id_insp_tec = t3.id_tec
        LEFT JOIN tb_tec t4 ON p.cd_id_def_doc_tec = t4.id_tec
        LEFT JOIN tb_tec t5 ON p.cd_id_sub_tec = t5.id_tec
        LEFT JOIN tb_city ct ON c.cd_id_city = ct.id_city
        WHERE c.ds_month_validity = ?
        ORDER by c.nm_comp_name;
    `;

    const [rows] = await db.query(query, [month]);
    return rows;
  } catch (error) {
    throw error;
  }
};
