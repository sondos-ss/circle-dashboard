import { Router } from "express";
import {getMembers,addMember,editMember,deleteMember} from "../controllers/memberController";

const router = Router();
router.get("/", getMembers);
router.post("/members", addMember);
router.post("/members/edit/:id", editMember);
router.post("/members/delete/:id", deleteMember);

export default router;