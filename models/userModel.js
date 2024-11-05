import { db } from "../config/db.js";

export const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM tb_user WHERE id = ?", [id])
    return rows[0];
}