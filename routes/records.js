import express from 'express'

import auth from '../controllers/auth.js'
import recordCreate from '../controllers/recordCreate.js'
import recordList from '../controllers/recordList.js'
import recordBasesList from '../controllers/recordBases.js'
import recordDelete from '../controllers/recordDelete.js'
import recordGetIndividual from '../controllers/recordGetIndividual.js'

const router = express.Router()

router.post('/', auth, recordCreate)
router.get('/', auth, recordList)
router.delete('/', auth, recordDelete)

router.get('/bases', auth, recordBasesList)

router.get('/individual', recordGetIndividual)

export default router