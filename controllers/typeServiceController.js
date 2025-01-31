import { getTypeService } from "../models/typeServiceModel.js";

export const getTypeServiceCt = async (req, res) => {
  try {
    const tservices = await getTypeService(req);

    if (!tservices) return res.status(404).send("Tipos de serviços não encontrados");

    res.json(tservices);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};
