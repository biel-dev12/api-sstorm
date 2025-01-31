import express from "express";
import { updatePgrCt } from "../controllers/pgrController.js";

const router = express.Router();

router.put("/:idPgr/:cd_company_id", updatePgrCt);

export default router;
