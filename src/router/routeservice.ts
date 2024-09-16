import { Application } from 'express'
import Routerengine from './router'
import authRouter from '../components/auth/AuthRouter'

import usersAdminRouter from '../components/users/admin/router'
import usersFrontRouter from '../components/users/front/Router'

import productsAdminRouter from '../components/product/admin/Router'
import productsFrontRouter from '../components/product/front/Router'

import couponAdminRouter from '../components/coupon/admin/Router'
import couponFrontRouter from '../components/coupon/front/Router'

import paymentsAdminRouter from '../components/payment/admin/Router'
import paymentFrontRouter from '../components/payment/front/Router'

import categoryRouter from '../components/category/CategoryRouter'
import ordersRouter from '../components/order/OrdersRouter'
import settingRouter from '../components/settings/SettingsRouter'
import commentsRouter from '../components/comments/CommentsRouter'

class RouteService{
    private app: Application
    private router: Routerengine
    public constructor(app: Application){
        this.app = app
        this.router = new Routerengine()
        this.bindRouters()
    }
    private bindRouters(){
        //admin
        this.router.registerRouter('/api/v1/admin/products', productsAdminRouter)
        this.router.registerRouter('/api/v1/admin/coupons', couponAdminRouter)
        this.router.registerRouter('/api/v1/admin/users', usersAdminRouter)
        this.router.registerRouter('/api/v1/admin/payments', paymentsAdminRouter)


        //front
        this.router.registerRouter('/api/v1/auth', authRouter)
        this.router.registerRouter('/api/v1/users', usersFrontRouter)
        this.router.registerRouter('/api/v1/products', productsFrontRouter)
        this.router.registerRouter('/api/v1/coupons', couponFrontRouter)
        this.router.registerRouter('/api/v1/payments', paymentFrontRouter)
        this.router.registerRouter('/api/v1/categories', categoryRouter)
        this.router.registerRouter('/api/v1/orders', ordersRouter)
        this.router.registerRouter('/api/v1/settings', settingRouter)
        this.router.registerRouter('/api/v1/comments', commentsRouter)
    }
    public run(){
        this.router.getRouters().forEach((router, route) => {
            this.app.use(route, router)
        })
    }
}   

export default RouteService