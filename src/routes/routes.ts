import { Request, Response, Application, NextFunction } from 'express'
import userRoutes from './userRoutes'

interface RouteInterface {
    path: string
    controller(req: Request, res: Response, next?: NextFunction): any
}

const routes: Array<RouteInterface> = [
    {
        path: '/users',
        controller: userRoutes
    },
    {
        path: '/',
        controller: (req: Request, res: Response) => {
            res.json({
                message: 'Hello World'
            })
        }
    }
]

const useRoutes = (app: Application): any => {
    routes.forEach((route: RouteInterface): void => {
        if (route.path === '/') {
            app.get(route.path, route.controller)
        } else {
            app.use(route.path, route.controller)
        }
    })
}

export default useRoutes