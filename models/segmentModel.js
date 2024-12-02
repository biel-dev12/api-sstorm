import { db } from "../config/db.js";

export const getAllSegment = async () => {
    const [rows] = await db.query("SELECT nm_segment FROM tb_segment")

    return rows
}