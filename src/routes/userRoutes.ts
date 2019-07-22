import { Router } from 'express'
import { getAllUser } from '../controllers/userController'

const router = Router()

router.get('/', getAllUser)

export default router