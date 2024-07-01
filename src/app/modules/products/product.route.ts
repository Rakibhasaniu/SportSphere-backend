import { Router } from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";


const router = Router();
router.post('/',auth(USER_ROLE.admin,USER_ROLE.manager),ProductController.addProduct);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.manager,USER_ROLE.seller),ProductController.getAllProduct);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.manager,USER_ROLE.seller),ProductController.getSingleProduct);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.manager),ProductController.updateProduct);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.manager),ProductController.deleteOne);
router.delete('/',auth(USER_ROLE.admin,USER_ROLE.manager),ProductController.deleteManyProducts);
// router.get(
//     '/values',
//     auth('user'),
//     ProductController.getProductByValues,
//   );
  

export const ProductRoutes = router