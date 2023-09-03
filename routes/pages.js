import { Router } from 'express'
import create from '../controllers/pages/create.js'

const router = Router()

router.post('/', create);

export default router