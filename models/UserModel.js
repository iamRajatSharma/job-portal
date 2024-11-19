import mongoose from "mongoose";
import z from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    location: {
        type: String,
        default: "India"
    }
}, {
    timeseries: true
})


// UserSchema.pre('save', async function () {
//     const user = this;
//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(user.password, salt)
// })

export const hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const decryptPassword = async function (password, hash) {
    return await bcrypt.compare(password, hash)
}

export const createToken = function (id) {
    return jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: "1d" })
}


export const UserValidation = z.object({
    name: z.string().min(4, "Name must be greater than 4 character").max(16, "Name can't be greater than 16 character"),
    email: z.string(),
    password: z.string().min(4, "Password must be greater than 4 character").max(16, "Password can't be greater than 16 character")
})


export const LoginValidation = z.object({
    email: z.string(),
    password: z.string().min(4, "Password must be greater than 4 character").max(16, "Password can't be greater than 16 character")
})

export default mongoose.model("User", UserSchema)
