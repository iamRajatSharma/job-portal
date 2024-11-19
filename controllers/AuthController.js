import UserModel, { createToken, decryptPassword, hashPassword, LoginValidation, UserValidation } from "../models/UserModel.js"

export const RegisterController = async (req, res) => {

    let { name, email, password } = req.body

    const result = UserValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }

    const checkUser = await UserModel.find({ email: email })

    if (checkUser.length > 0) {
        return res.status(200).send({ message: "User already exists with this email" })
    }

    password = await hashPassword(password)

    const user = await UserModel.create({ name, email, password })

    const token = createToken(user._id);

    return res.status(201).send({
        message: "user created successfully", status: true, user: {
            name: user.name,
            email: user.email,
            location: user.location
        }, token
    })

}


export const LoginController = async (req, res) => {
    let { email, password } = req.body

    const result = LoginValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }

    const user = await UserModel.find({ email })

    if (user.length == 0) {
        return res.status(400).send({ message: "Email id is not registered with us" })
    }
    const passwordRespose = await decryptPassword(password, user[0].password)

    if (!passwordRespose) {
        return res.status(400).send({ message: "Email/Password is incorrect" })
    }

    const newUser = user[0]
    delete newUser.password

    const token = createToken(user._id);

    return res.status(200).send({ message: "Login Successfully", newUser, token })

}