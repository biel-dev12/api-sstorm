import { createCompany } from "../models/companyModel.js";

export const createCompanyCt = async (req, res) => {
  const companyData = req.body;

  try {
    const compId = await createCompany(companyData);
    res.status(201).json({ message: "Empresa criada com sucesso!", compId });
  } catch (error) {
    console.error("Erro ao cadastrar empresa:", error.message);

    if (error.message.includes("CNPJ já cadastrado")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro ao cadastrar empresa." });
  }
};
