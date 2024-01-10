import dotenv from 'dotenv'
import colors from 'colors'
import {db} from '../config/db.js'
import Menu from '../models/Menu.js'
import { menu } from './menu.js'

dotenv.config()

await db()

async function seedDB() {
    try {
        await Menu.insertMany(menu)
        console.log(colors.green.bold('Los datos se cargaron de manera exitosa'))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

async function clearDB(){
    try {
        await Menu.deleteMany()
        console.log(colors.red.bold('Los datos se eliminaron de manera exitosa'))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

//Argument vector localiza este archivo en package.json
console.log(process.argv[2])

if(process.argv[2] === '--import') {
    seedDB()
} else {
    clearDB()
}