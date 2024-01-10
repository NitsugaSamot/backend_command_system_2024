import User from "../models/User.js"
import generarJWT from "../helpers/generateJWT.js"

const createUser = async (req, res) => {

    //Evitar regisyror duplicados
    const {name} = req.body
    const existingUser = await User.findOne({name})

    if(existingUser) {
        const error = new Error('Usuario existente')
        return res.status(400).json({msg: error.message})
    }

    try {
        const user = new User(req.body)
        await user.save()

        res.json({msg: 'Usuario Creado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const authenticate = async (req,res) => {

    const {name, password} = req.body

    //Comprobar si el password existe
    const user = await User.findOne({name})
    if(!user) {
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    //Comprobar su password
    if(await user.comprobarPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            token: generarJWT(user._id)
        })
    } else {
        const error = new Error('Password Incorrecto')
        return res.status(403).json({msg: error.message})
    }


}

const profile = (req,res) => {
    const { user } = req

    res.json(user)
}

export{createUser, authenticate, profile}