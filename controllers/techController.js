import { getTech, getTechById } from "../models/techModel.js";

export const getTechCt = async (req, res) => {
  try {
    const techs = await getTech(req.params.id);

    if (!techs) return res.status(404).send("Técnicos não encontrados");

    res.json(techs);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};

export const getTechByIdCt = async (req, res) => {
  try{
    const tech = await getTechById(req.params.id)

    if (!tech) return res.status(404).send("Técnico não encontrado");

    res.json(tech);
  }catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
}
