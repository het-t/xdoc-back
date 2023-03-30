import express from 'express'

import auth from '../controllers/auth.js'
import fieldCreate from '../controllers/fieldCreate.js'
import fieldList from '../controllers/fieldList.js'
import fieldDelete from '../controllers/fieldDelete.js'
import fieldTypes from '../controllers/fieldTypesMain.js'

const router = express.Router()

router.post('/', auth, fieldCreate)
router.get('/', auth, fieldList)
router.delete('/', auth, fieldDelete)

router.get('/types', auth, fieldTypes)

export default router