import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import categoryCtrl from '../controllers/categoryCtrl'
import newsCtrl from '../controllers/newsCtrl'
import serviceCtrl from '../controllers/serviceCtrl'
import aboutCtrl from '../controllers/aboutCtrl'
import routerCtrl from '../controllers/routerCtrl'
import apiCtrl from '../controllers/apiCtrl'

import upload from '../controllers/upload'
import admin from '../controllers/admin'

const router = Router()

/**
 * 官网所需模板路由
 */
router.get('/', indexCtrl)
router.get('/index', indexCtrl)
router.get('/categories/:name', categoryCtrl)
router.get('/:name', routerCtrl)

/**
 * admin后台所需接口
 */
router.get('/api/home/all', apiCtrl.getHomeAll)
router.get('/api/news/all', apiCtrl.getNewsAll)
router.get('/api/about/all', apiCtrl.getAboutAll)
router.get('/api/service/all', apiCtrl.getServiceAll)
router.put('/api/home', apiCtrl.updateHome)
router.put('/api/news', apiCtrl.updateNews)
router.put('/api/about', apiCtrl.updateAbout)
router.put('/api/service', apiCtrl.updateService)
router.post('/api/upload', upload)
router.all('**', admin)

export default router
