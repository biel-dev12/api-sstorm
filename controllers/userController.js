import { getUserById, getAllUsers, createUser } from "../models/userModel.js";

export const getUserByIdCt = async (req, res) => {
    try{
        const user = await getUserById(req.params.id)
        if (!user) return res.status(404).send("Usuario nao encontrado");

        res.json(user)
    }
    catch (error){
        res.status(500).send("Erro no servidor")
    }
}

export const getAllUsersCt = async (req, res) => {
    try{
        const users = await getAllUsers(req)
        if (!users) return res.status(404).send("Usuario nao encontrado");

        res.json(users)
    }
    catch (error){
        res.status(500).send("Erro no servidor")
    }
}

export const createUserCt = async (req, res) => {
    console.log(req.body)
    const userData = req.body;

    if(!userData.fullname || !userData.dept || !userData.email || !userData.username || !userData.newPassw) {
        return res.status(400).json({ error: "Por favor, preencha todos os campos." });
    }

    try {
        const userId = await createUser(userData);
        res.status(201).json({ message: "Usuário criado com sucesso", userId });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
}