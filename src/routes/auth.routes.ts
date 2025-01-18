import { Router } from "express";
import { createUser } from "../controllers/create.user";
import { login } from "../controllers/login";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
