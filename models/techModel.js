import { db } from "../config/db.js";

export const getTech = async () => {
    const [rows] = await db.query("SELECT * FROM tb_tec")

    return rows
}

export const getTechById = async (idTech) => {
    const query = "SELECT nm_tec FROM tb_tec WHERE id_tec = ?"

    const [rows] = await db.query(query, [idTech])
    return rows.length ? rows[0] : null;    
}