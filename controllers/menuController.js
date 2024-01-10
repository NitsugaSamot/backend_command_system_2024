import Menu from '../models/Menu.js'
import { validateObjectId, handleNotFoundError } from "../utils/index.js"

const createMenu = async(req, res) => {
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        /* return previene la ejecucion del codigo en caso  uw caiga en el error */
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const menu = new Menu(req.body)
        await menu.save()

        res.json({
            msg: 'El menú quedo se registro de manera exitosa!'
        })
    } catch (error) {
        console.log(error)
    }
}

const getMenu = async(req, res) => {
    try {
        const menu = await Menu.find()
        res.json(menu)
    } catch (error) {
        console.log(error)
    }
}

const getMenuById = async(req, res) => {
    
    const {id} = req.params

    // Validar el object id
    if(validateObjectId(id, res)) return

    // Validar que existe
    const menu = await Menu.findById(id)
       if(!menu){
            return handleNotFoundError('El menu no existe', res)
       }


    // Mostrar el servicio
    res.json(menu)
}


// http://localhost:4000/api/menu/categories
const getCategories = async (req, res) => {
    try {
      // Obtén todos los platillos de la base de datos
      const menu = await Menu.find();
  
      // Utiliza un conjunto (Set) para almacenar las categorías únicas
      const categoriesSet = new Set();
  
      // Recorre los platillos y agrega sus categorías al conjunto
      menu.forEach(menuItem => {
        categoriesSet.add(menuItem.category);
      });
  
      // Convierte el conjunto a un array
      const categoriesArray = Array.from(categoriesSet);
  
      // Responde con el array de categorías
      res.json(categoriesArray);
    } catch (error) {
      console.log(error);
      // Maneja los errores de manera adecuada
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };


  const getMenuByCategory = async (req, res) => {
    let { category } = req.params;
    // Convierte la categoría a minúsculas (asegurando que no importa la capitalización)
  
  
    try {
      const menu = await Menu.find({ category });
  
      if (menu.length === 0) {
        // Si no se encontraron elementos, puedes responder con un mensaje de "no encontrado"
        return handleNotFoundError('No se encontraron elementos en la categoría especificada', res);
      }
  
      // Responder con los elementos encontrados
      res.json(menu);
    } catch (error) {
      console.log(error);
      // Manejar errores de manera adecuada
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

// const getMenuByCategory = async (req, res) => {
//     const { category } = req.params;
  
//     try {
//       const menu = await Menu.find({ category });
  
//       if (menu.length === 0) {
//         // Si no se encontraron elementos, puedes responder con un mensaje de "no encontrado"
//         return handleNotFoundError('No se encontraron elementos en la categoría especificada', res);
//       }
  
//       // Responder con los elementos encontrados
//       res.json(menu);
//     } catch (error) {
//       console.log(error);
//       // Manejar errores de manera adecuada
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
//   };
  

const updateMenu = async(req, res) => {
       
       const {id} = req.params

       // Validar el object id
       if(validateObjectId(id, res)) return

       // Validar que existe
       const menu = await Menu.findById(id)
       if(!menu){
            return handleNotFoundError('El servicio no existe', res)
       }

       //Escribimos los valores nuevoss
       menu.name = req.body.name || menu.name
       menu.price = req.body.price || menu.price
       menu.category = req.body.category || menu.category
       menu.image = req.body.image || menu.image

       try {
            await menu.save()
            res.json({
                msg: 'Los cambios se guardaron de manera exitosa!'
            })
       } catch (error) {
            console.log(error)
       }
}

const deleteMenu = async(req, res) => {
    const {id} = req.params

    // Validar el object id
    if(validateObjectId(id, res)) return

    // Validar que existe
    const menu = await Menu.findById(id)
    if(!menu){
         return handleNotFoundError('El menú no existe', res)
    }

    try {
        await menu.deleteOne()
        res.json({
            msg: 'El menú se eliminó de manera exitosa'
        })
    } catch (error) {
        console.log(error)
    }

}
 
export {createMenu ,getMenu, getMenuById, getCategories,getMenuByCategory,updateMenu, deleteMenu } 