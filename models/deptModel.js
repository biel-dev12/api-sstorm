import { db } from "../config/db.js";

export const getAllDept = async () => {
  const [rows] = await db.query("SELECT * FROM tb_dept")
  return rows
}