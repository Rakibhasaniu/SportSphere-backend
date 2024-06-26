import { Router } from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";


const router = Router();
router.post('/',ProductController.addProduct);
router.get('/',auth(),ProductController.getAllProduct);
router.put('/:id',ProductController.updateProduct);

export const ProductRoutes = router