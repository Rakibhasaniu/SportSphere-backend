import { Router } from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";


const router = Router();
router.post('/',ProductController.addProduct);
router.get('/',auth('user'),ProductController.getAllProduct);
router.get('/:id',auth('user'),ProductController.getSingleProduct);
router.patch('/:id',ProductController.updateProduct);
router.delete('/:id',ProductController.deleteOne);
router.get(
    '/values',
    auth('user'),
    ProductController.getProductByValues,
  );
  

export const ProductRoutes = router