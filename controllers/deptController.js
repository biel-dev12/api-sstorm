import { getAllDept } from "../models/deptModel.js";

export const getAllDeptCt = async (req, res) => {
  try{
    const depts = await getAllDept(req)
    if (!depts) return res.status(404).send("Depto não encontrado")

    res.json(depts)
  }
  catch(error){
    res.status(500).send(`Erro no servidor: ${error}`)
  }
}