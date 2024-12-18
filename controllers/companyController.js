import { createCompany, updateCompany, findByField, deleteCompany, compByMonth } from "../models/companyModel.js";

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

export const deleteCompanyCt = async (req, res) => {
  const { id_company } = req.query

  try {
    const affectedRows = await deleteCompany(id_company);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    res.status(200).json({ message: "Empresa deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar empresa:", error.message);
    res.status(500).json({ error: "Erro ao deletar empresa." });
  }
}

export const compByMonthCt = async (req, res) => {
  try{
    const { month } = req.params
    const companies = await compByMonth(month)
    res.status(200).json(companies)
  }
  catch (error) {
    res.status(500).json({message:"Erro ao buscar empresas", error})
  }
}