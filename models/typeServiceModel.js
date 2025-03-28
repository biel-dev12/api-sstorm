import { db } from "../config/db.js";

export const getTypeService = async () => {
    const [rows] = await db.query("SELECT * FROM tb_type_service")

    return rows
}

export const getTypeServiceById = async (idTService) => {
    const query = "SELECT nm_type_service FROM tb_type_service WHERE id_type_service = ?"

    const [rows] = await db.query(query, [idTService])
    return rows.length ? rows[0] : null;    
}