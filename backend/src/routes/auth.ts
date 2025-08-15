import { Router } from "express";
import { mockLogin } from "../controllers/authController";

const router = Router();

router.post("/auth/login", mockLogin);

export default router;