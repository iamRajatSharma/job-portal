import UserModel, { createToken, UserUploadteValidation } from "../models/UserModel.js"

export const updateUserController = async (req, res) => {

    let { id, name, email } = req.body
    const result = UserUploadteValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }

    const user = await UserModel.find({ _id: id })

    if (user.length == 0) {
        return res.status(400).send({ message: "No user found" })
    }

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, { name: name, email: email })

    if (updatedUser) {
        const token = createToken(updatedUser._id)
        return res.status(400).send({ message: "User Updated Successfully", user: updatedUser, token })
    }


}