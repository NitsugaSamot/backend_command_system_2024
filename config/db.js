import mongoose from "mongoose"
import colors from 'colors'

export const db = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.yellow.bgCyan('MongoDB se conecto correctamente:', url))
    } catch (error) {
        console.log(colors.red(`Errpr: ${error.message}`))
        /* Si falla la conexion a la base de datos process.exit detiene el programa, si hay un error ponemos 1 */
        process.exit(1)
    }
}