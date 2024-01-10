import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["Waiter", "Chef", "Admin"],
        default: "Waiter",
      }
}, {
    timestamps: true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare (passwordFormulario, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
