import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    // Define las propiedades de cada objeto en el array
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    subtotal: {
        type: Number,
        required: false
    },
    total: {
        type: Number,
        required: false
    }
});

const orderSchema = mongoose.Schema({
    waiter: {
        type: String,
        required: true,
        trim: true
    },
    table: {
        type: Number,
        required: true,
        trim: true
    },
    diners: {
        type: Number,
        required: true,
        trim: true
    },
    state: {
        type: String,
        enum: ['In progress', 'Completed', 'Paid'],
        default: 'In progress'
    },
    command: [orderItemSchema] // Define un array de objetos usando el esquema orderItemSchema
});

const Command = mongoose.model('Command', orderSchema);

export default Command;

