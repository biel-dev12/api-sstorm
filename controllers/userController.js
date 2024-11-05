import { getUserById } from "../models/userModel.js";

export const getUser = async (req, res) => {
    try{
        const user = await getUserById(req.params.id)
        if (!user) return res.status(404).send("Usuario nao encontrado");

        res.json(user)
    }
    catch (error){
        res.status(500).send("Erro no servidor")
    }
}