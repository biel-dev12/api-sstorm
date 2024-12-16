import { createCompany, updateCompany, findByField } from "../models/companyModel.js";

export const findByFieldCt = async (req, res) => {
  const { name, cnpj } = req.query;
  try {
    const result = await findByField(name ? "nm_comp_name" : "cd_cnpj", name || cnpj);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empresa" });
  }
};

export const createCompanyCt = async (req, res) => {
  const companyData = req.body;
  try {
    const compId = await createCompany(companyData);
    res.status(201).json({ message: "Empresa criada com sucesso!", compId });
  } catch (error) {
    res.status(error.message.includes("cadastrado") ? 400 : 500).json({ error: error.message });
  }
};

export const updateCompanyCt = async (req, res) => {
  const companyId = req.params.id;
  const companyData = req.body;

  try {
    const result = await updateCompany(companyId, companyData);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Empresa atualizada com sucesso!" });
    } else {
      res.status(404).json({ error: "Empresa não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error.message);

    if (
      error.message.includes("CNPJ já cadastrado") ||
      error.message.includes("Nome já cadastrado")
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro ao atualizar empresa." });
  }
};
