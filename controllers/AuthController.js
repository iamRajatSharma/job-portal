import UserModel, { UserValidation } from "../models/UserModel.js"

export const AuthController = async (req, res) => {
    const { name, email, password } = req.body

    const result = UserValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }
    console.log(result)

    // password = 

    const checkUser = await UserModel.find({ email: email })

    if (checkUser.length > 0) {
        return res.status(200).send({ message: "User already exists with this email" })
    }

    const user = await UserModel.create({ name, email, password })
    return res.status(201).send({ message: "user created successfully", status: true, user })

}