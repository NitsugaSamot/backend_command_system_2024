import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const checkAuth = async(req, res, next) => {

    // Se inicializa una variable token para almacenar el token de autorización presente en el encabezado Authorization de la solicitud
    let token

    // Si el encabezado Authorization comienza con "Bearer", se extrae el token de autorización y se almacena en la variable token.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]

                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                req.user = await User.findById(decoded.id).select('-password ')

                // console.log(req.usuario)
            } catch (error) {
                return res.status(404).json({msg: 'Hubo un error'})
            }
    }
    
    if(!token) {
        const error = new Error('Token no válido')
        return res.status(401).json({ msg: error.message })
    }

    next()

}

export default checkAuth






// Si se encontró un token válido, se intenta verificarlo usando jwt.verify(). Si la verificación es exitosa, se obtiene el ID del usuario desde el token decodificado y se busca el usuario en la base de datos utilizando el modelo Usuario.

// Si se encuentra un usuario válido, se agregan sus detalles al objeto req.usuario para que pueda ser utilizado en otras rutas y controladores.

// Si el token no es válido o ha expirado, se devuelve un error y se envía una respuesta de error al cliente.