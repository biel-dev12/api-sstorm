import express from "express";
import { getPgrByCompanyCt, updatePgrCt } from "../controllers/pgrController.js";

const router = express.Router();

router.put("/:idPgr/:cd_company_id", updatePgrCt);
router.get("/:companyId", getPgrByCompanyCt)

export default router;
