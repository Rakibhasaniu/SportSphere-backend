import { Router } from "express";
import { UserController } from "./user.controller";
import validate from "../../middlewares/Validation";
import { userValitdations } from "./user.validation";


const router = Router();

router.post('/register',validate(userValitdations.userValidationSchema),UserController.register);
router.post('/login',UserController.login);

export const UserRoutes = router;