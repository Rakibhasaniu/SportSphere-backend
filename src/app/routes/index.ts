import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.route'


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
//   {
//     path: '/products',
//     route: productRoutes,
//   },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
