import { Router } from "express";
import { firebaseAuth } from "../middlewares/firebaseAuth";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post("/login", firebaseAuth, login);

export default router;