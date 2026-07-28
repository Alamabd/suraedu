import { Router } from "express";

import {
    createLetter,
    getLettersPublic,
    getLetters,
    updateLetter,
    deleteLetter,
} from "../controllers/letter.controller";
import upload from "../middlewares/upload";

const router = Router();

router.get("/", getLettersPublic);

router.get("/:id", getLetters);

router.post("/", upload.single("file"), createLetter);

router.put("/:id", upload.single("file"), updateLetter);

router.delete("/:id", deleteLetter);

export default router;