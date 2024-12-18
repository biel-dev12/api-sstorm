import { getCity } from "../models/cityModel.js";

export const getCityCt = async (req, res) => {
  try {
    const cities = await getCity(req);

    if (!cities) return res.status(404).send("Cidades não encontradas");

    res.json(cities);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};
