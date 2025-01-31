import { db } from "../config/db.js";

export const getTypeService = async () => {
    const [rows] = await db.query("SELECT * FROM tb_type_service")

    return rows
}