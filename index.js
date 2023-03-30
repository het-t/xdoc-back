import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import {fileURLToPath} from 'url'
import router from './routes/index.js'

//***************************************//
//     to fetch the latest  ***********
//************************************* */
// import db from './models/index.js'

// import SequelizeAuto from 'sequelize-auto'

// console.log("db sequelize", db.sequelize.options)
// const auto = new SequelizeAuto(
//     db.sequelize.options
// )
// auto.run()


//**************************************** */


const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'dist')))

app.use(cookieParser('secret'))
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit:'5mb'}))


app.use('/api', router)

app.listen(8181, ()=>{
    console.log("PORT 8181")
})
