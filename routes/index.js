import express from 'express'

import generalRoutes from '../routes/general.js'
import fieldsRoutes from '../routes/fields.js'
import reocrdsRoutes from '../routes/records.js'
import usersRoutes from '../routes/users.js'

const app = express()

app.use('/', generalRoutes)
app.use('/fields', fieldsRoutes)
app.use('/records', reocrdsRoutes)
app.use('/users', usersRoutes)

export default app