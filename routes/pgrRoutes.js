import express from "express";
import { getPgrByCompanyCt, getPgrByMonthCt, updatePgrCt } from "../controllers/pgrController.js";

const router = express.Router();

router.put("/:idPgr/:cd_company_id", updatePgrCt);
router.get("/:companyId", getPgrByCompanyCt)
router.get("/month/:month", getPgrByMonthCt)

export default router;
