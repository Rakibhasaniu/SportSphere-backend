import { Router } from 'express'


const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: '',
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
