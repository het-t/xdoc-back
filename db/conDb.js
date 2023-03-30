import * as mysql from 'mysql2'
import dbInfo from './db-info.js'

const con = mysql.createConnection(dbInfo)

export default con;