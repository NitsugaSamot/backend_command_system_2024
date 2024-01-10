import Command from "../models/Command.js";

const createCommand = async(req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        /* return previene la ejecucion del codigo en caso  uw caiga en el error */
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const command = new Command(req.body)
        await command.save()

        res.json({
            msg: 'La comanda se ha cargado de manera exitosa'
        })
    } catch (error) {
        console.log(error)
    }
}

const getCommands = async(req, res) => {
    try {
        const command = await Command.find()
        res.json(command)
    } catch (error) {
        console.log(error)
    }
}

export {createCommand, getCommands}