const errorMiddleware = (error, req, res, next) => {
    console.log(error)
    return res.status(400).send({ err, success: false, message: "Something went wrong" });
}
export default errorMiddleware;