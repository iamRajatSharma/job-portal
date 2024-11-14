import UserModel from "../models/UserModel.js"

export const AuthController = async () => {
    try {
        const { name, email, password } = req.body
        if (!name) {
            res.status(400).send({ message: "Please provide Name" })
        }
        if (!email) {
            res.status(400).send({ message: "Please provide EMail" })
        }
        if (!password) {
            res.status(400).send({ message: "Please provide Password" })
        }

        const checkUser = await UserModel.find({ email: email })
        if (checkUser) {
            res.status(200).send({ message: "User already exists with this email" })
        }

        const user = await UserModel.create({ name, email, password })
        res.status(201).send({ message: "user created successfully", status: true, user })


    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
}