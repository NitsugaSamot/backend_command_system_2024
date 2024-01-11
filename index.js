import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import {db} from './config/db.js'
import menuRoutes from './routes/menuRoutes.js'
import commandRoutes from './routes/commandRoutes.js'
import userRoutes from './routes/userRoutes.js'


//Variables de entorno
dotenv.config()

//Configirara app
const app = express()

//Leer datos via Body, habilitamos a leer los datos via Body
app.use(express.json())

//Conectar  a base de datos
db()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_LOCAL];


const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)) {
        //Puede consultar la API
        callback(null, true)
        } else {
            //No ésta permitido
            callback(new Error('Error de Cors'))

        }
    }
}

app.use(cors(corsOptions))

//Definir ruta
app.use('/api/menu', menuRoutes)
app.use('/api/command', commandRoutes)
app.use('/api/auth', userRoutes)

//Definir puerto
const PORT = process.env.PORT || 4000

//Arrancar puerto
app.listen(PORT, () => {
    console.log(colors.cyan.bgMagenta.bold('Servidor en el puerto:'), colors.bold.yellow(PORT))
})