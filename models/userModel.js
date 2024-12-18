import { db } from "../config/db.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM tb_user")
    return rows;
}

export const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM tb_user WHERE id_user = ?", [id])
    return rows[0];
}

export const createUser = async (userData) => {
    

    const { fullname, dept, email, username, newPassw} = userData

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassw, salt)

    const dtRegistered = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `INSERT INTO tb_user (nm_full_name, cd_email, cd_password, nm_username, dt_registered, cd_dept_id) VALUES (?, ?, ?, ?, ?, (SELECT id_dept FROM tb_dept WHERE nm_dept = ?))`

    const [result] = await db.query(query, [fullname, email, hashedPassword, username, dtRegistered, dept])

    return result.insertId // Retorna o ID do usuário criado
}

export const login = async (userData) => {
    const { username, passw } = userData;

    const query = "SELECT * FROM tb_user WHERE nm_username = ?";
    const [rows] = await db.query(query, [username]);
  
    if (rows.length === 0) {
      throw new Error("Usuário não encontrado");
    }
  
    const user = rows[0];
  
    const isPasswordValid = await bcrypt.compare(passw, user.cd_password);
  
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }
  
    return { id_user: user.id_user, username: user.nm_username };
}

