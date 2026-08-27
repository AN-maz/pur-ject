import { Router } from 'express'
import auth from '../middlewares/auth.js'
import { requireAdmin } from '../middlewares/rbac.js'
import { validate } from '../middlewares/validate.js'
import { sanitize } from '../middlewares/sanitize.js'
import { schemas } from '../schemas/index.js'

import * as authController from '../controllers/auth.controller.js'
import * as categoryController from '../controllers/category.controller.js'
import * as materialController from '../controllers/material.controller.js'
import * as leaderboardController from '../controllers/leaderboard.controller.js'
import * as adminController from '../controllers/admin.controller.js'

const router = Router()

router.get('/', (req, res) => res.json({ success: true, message: 'LMS API v1', data: { status: 'ok' } }))

router.post('/auth/register', validate(schemas.register), authController.register)
router.post('/auth/login',    validate(schemas.login),    authController.login)
router.get('/auth/me',        auth,                       authController.getMe)

router.get('/categories', categoryController.getAllCategories)

router.get('/materials',   validate(schemas.pagination, 'query'), materialController.listMaterials)
router.get('/materials/:slug', materialController.getMaterialDetail)

router.post('/materials', auth, validate(schemas.createMaterial), materialController.createMaterial)
router.get('/users/me/materials', auth, materialController.getUserMaterials)
router.put('/materials/:id', auth, validate(schemas.updateMaterial), materialController.updateMaterial)
router.post('/materials/:id/complete', auth, validate(schemas.materialId, 'params'), materialController.markComplete)
router.post('/materials/:id/ratings', auth, validate(schemas.materialId, 'params'), validate(schemas.createRating), materialController.createRating)

router.get('/materials/:id/comments', validate(schemas.materialId, 'params'), materialController.listComments)
router.post('/materials/:id/comments', auth, validate(schemas.materialId, 'params'), validate(schemas.createComment), sanitize(['comment_text']), materialController.postComment)

router.get('/leaderboard', leaderboardController.getLeaderboard)

router.get('/admin/materials',   auth, requireAdmin, validate(schemas.pagination, 'query'), adminController.getPendingMaterials)
router.patch('/admin/materials/:id/status', auth, requireAdmin, validate(schemas.materialId, 'params'), validate(schemas.updateMaterialStatus), adminController.updateMaterialStatus)

router.post('/admin/categories',   auth, requireAdmin, validate(schemas.createCategory), adminController.createCategory)
router.put('/admin/categories/:id', auth, requireAdmin, validate(schemas.updateCategory), adminController.updateCategory)
router.delete('/admin/categories/:id', auth, requireAdmin, adminController.deleteCategory)

router.get('/categories/:slug', validate(schemas.categorySlug, 'params'), categoryController.getCategoryBySlug)

export default router
