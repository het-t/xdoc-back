import express from 'express'

import generalRoutes from '../routes/general.js'
import fieldsRoutes from '../routes/fields.js'
import reocrdsRoutes from '../routes/records.js'
import usersRoutes from '../routes/users.js'
import blocksRoutes from '../routes/_blocks.js'
import pagesRoutes from '../routes/_pages.js'

import auth from '../controllers/auth.js'

const app = express()

app.use('/', generalRoutes)
app.use('/fields', fieldsRoutes)
app.use('/records', reocrdsRoutes)
app.use('/users', usersRoutes)
app.use('/blocks', auth, blocksRoutes)
app.use('/pages', auth, pagesRoutes)

export default app