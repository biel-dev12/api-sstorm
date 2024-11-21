import {
  getUserById,
  getAllUsers,
  createUser,
  login,
} from "../models/userModel.js";

export const getUserByIdCt = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).send("Usuario nao encontrado");

    res.json(user);
  } catch (error) {
    res.status(500).send("Erro no servidor");
  }
};

export const getAllUsersCt = async (req, res) => {
  try {
    const users = await getAllUsers(req);
    if (!users) return res.status(404).send("Usuario nao encontrado");

    res.json(users);
  } catch (error) {
    res.status(500).send("Erro no servidor");
  }
};

export const createUserCt = async (req, res) => {
  const userData = req.body;

  if (
    !userData.fullname ||
    !userData.dept ||
    !userData.email ||
    !userData.username ||
    !userData.newPassw
  ) {
    return res
      .status(400)
      .json({ error: "Por favor, preencha todos os campos." });
  }

  try {
    const userId = await createUser(userData);
    res.status(201).json({ message: "Usuário criado com sucesso", userId });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar o usuário" });
  }
};

export const loginCt = async (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.passw) {
    return res.status(400).json({ error: "Por favor, preencha todos os campos." });
  }

  try {
    const user = await login(userData);
    res.status(200).json({ message: "Login realizado com sucesso", user });
  } catch (error) {
    const statusCode = error.message === "Usuário não encontrado" || error.message === "Senha inválida" ? 401 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

