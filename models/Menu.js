import mongoose from "mongoose";

const menuSchema = mongoose.Schema(({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    }
}))

const Menu = mongoose.model('Menu', menuSchema)

export default Menu