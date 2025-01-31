import { db } from "../config/db.js";

export const getTech = async () => {
    const [rows] = await db.query("SELECT * FROM tb_tec")

    return rows
}