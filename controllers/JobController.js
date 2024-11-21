import JobsModel, { JobValidation } from "../models/JobsModel.js"

// create new job
export const createJobController = async (req, res) => {
    const { company, position, status, type } = req.body

    const result = JobValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }

    const createdBy = req.user.userId

    const data = await JobsModel.create({ company, position, status, type, createdBy })

    if (data) {
        return res.status(200).send({ message: "Job created successfully", data })
    }
    else {
        return res.status(400).send({ "message": "Server error" })
    }

}


// get all jobs
export const getJobController = async (req, res) => {
    const jobs = await JobsModel.find({ createdBy: req.user.userId })
    return res.status(200).json({ totalCount: jobs.length, jobs });
}