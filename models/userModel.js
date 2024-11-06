import { db } from "../config/db.js";

export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM tb_users")
    return rows;
}

export const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM tb_users WHERE id_user = ?", [id])
    return rows[0];
}