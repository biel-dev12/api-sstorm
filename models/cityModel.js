import { db } from "../config/db.js";

export const getCity = async () => {
    const [rows] = await db.query("SELECT * FROM tb_city")

    return rows
}