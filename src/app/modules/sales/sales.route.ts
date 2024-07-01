import { Router } from "express";
import { SalesController } from "./sales.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";


const router = Router();

router.post('/',auth(USER_ROLE.admin,USER_ROLE.seller),SalesController.addSales);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.seller),SalesController.getSales)
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.seller),SalesController.deleteSales)


export const SalesRoutes = router;