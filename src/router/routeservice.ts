import { Application, Request, Response, Router } from 'express'
import Routerengine from './router'
import usersRouter from '../components/users/usersRouter'
import productsRouter from '../components/product/producsRouter'
import categoryRouter from '../components/category/CategoryRouter'
import ordersRouter from '../components/order/OrdersRouter'
import couponRouter from '../components/coupon/CouponsRouter'
import paymentsRouter from '../components/payment/PaymentsRouter'
import settingRouter from '../components/settings/SettingsRouter'

class RouteService{
    private app: Application
    private router: Routerengine
    public constructor(app: Application){
        this.app = app
        this.router = new Routerengine()
        this.bindRouters()
    }
    private bindRouters(){
        this.router.registerRouter('/api/v1/users', usersRouter)
        this.router.registerRouter('/api/v1/products', productsRouter)
        this.router.registerRouter('/api/v1/categories', categoryRouter)
        this.router.registerRouter('/api/v1/orders', ordersRouter)
        this.router.registerRouter('/api/v1/coupons', couponRouter)
        this.router.registerRouter('/api/v1/payments', paymentsRouter)
        this.router.registerRouter('/api/v1/settings', settingRouter)
    }
    public run(){
        this.router.getRouters().forEach((router, route) => {
            this.app.use(route, router)
        })
    }
}   

export default RouteService