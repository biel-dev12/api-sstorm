import { getTech } from "../models/techModel.js";

export const getTechCt = async (req, res) => {
  try {
    const techs = await getTech(req);

    if (!techs) return res.status(404).send("Técnicos não encontrados");

    res.json(techs);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};
