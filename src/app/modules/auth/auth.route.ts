import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateSchema } from "../../middleware/validateSchema";
import { RegisterZodSchema } from "./auth.validation";
import { checkAuth } from "../../utils/checkAuth";


const router = Router();

router.get('/me',
    checkAuth(),
    AuthController.getMe);

router.post('/register',
    validateSchema(RegisterZodSchema),
    AuthController.register);

router.post('/login', AuthController.login);
router.post('/logout',
    checkAuth(),
    AuthController.logout);

export const authRoutes = router;