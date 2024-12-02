import { getAllSegment } from "../models/segmentModel.js";

export const getAllSegmentCt = async (req, res) => {
  try {
    const segments = await getAllSegment(req);

    if (!segments) return res.status(404).send("Segmentos não encontrados");

    res.json(segments);
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`);
  }
};
