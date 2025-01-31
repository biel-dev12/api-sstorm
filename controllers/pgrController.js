import { updatePgrData } from "../models/pgrModel.js";

export const updatePgrCt = async (req, res) => {
  const { idPgr, cd_company_id } = req.params; // Obtém os IDs da URL
  const data = req.body; // Obtém os dados do front-end

  if (!idPgr || !cd_company_id) {
    return res.status(400).json({ error: "ID do PGR e ID da empresa são obrigatórios." });
  }

  try {
    const success = await updatePgrData(idPgr, cd_company_id, data);

    if (success) {
      return res.status(200).json({ message: "Dados do PGR atualizados com sucesso!" });
    } else {
      return res.status(404).json({ error: "PGR ou empresa não encontrados." });
    }
  } catch (error) {
    console.error("Erro no controlador do PGR:", error.message);
    return res.status(500).json({ error: "Erro ao atualizar os dados do PGR." });
  }
};
