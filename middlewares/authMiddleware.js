import JWT from "jsonwebtoken"

export const userAuth = (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer')) {
        return res.status(400).send({ message: "Token required" })
    }

    const token = header.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.SECRET)
        req.user = { userId: payload }
        next()
    } catch (error) {
        return res.status(400).send({ message: "Invalid Token" })
    }
}