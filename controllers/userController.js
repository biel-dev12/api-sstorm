import { getUserById, getAllUsers } from "../models/userModel.js";

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