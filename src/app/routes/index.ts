import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { ProductRoutes } from '../modules/products/product.route'


const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
//   {
//     path: '/sales',
//     route: salesRoutes,
//   },
  {
    path: '/product',
    route: ProductRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
