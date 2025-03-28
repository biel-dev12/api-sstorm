import { getTypeService, getTypeServiceById } from "../models/typeServiceModel.js";

export const getTypeServiceCt = async (req, res) => {
  try {
    const tservices = await getTypeService(req);

    if (!tservices) return res.status(404).send("Tipos de serviços não encontrados");

    res.json(tservices);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};

export const getTypeServiceByIdCt = async (req, res) => {
  try{
    const tService = await getTypeServiceById(req.params.id)

    if (!tService) return res.status(404).send("Tipo de serviço não encontrado");

    res.json(tService);
  }catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
}
