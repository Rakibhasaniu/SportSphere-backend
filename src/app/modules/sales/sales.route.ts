import { Router } from "express";
import { SalesController } from "./sales.controller";


const router = Router();

router.post('/',SalesController.addSales);
router.get('/',SalesController.getSales)


export const SalesRoutes = router;