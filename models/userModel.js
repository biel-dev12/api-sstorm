import { db } from "../config/db.js";

export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM tb_user")
    return rows;
}

export const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM tb_user WHERE id_user = ?", [id])
    return rows[0];
}