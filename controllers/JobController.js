import mongoose from "mongoose"
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

export const updateJob = async (req, res) => {
    const id = req.params.id;
    const { company, position } = req.body

    const result = JobValidation.safeParse(req.body)

    if (result.success == false) {
        return res.status(400).send(result.error.issues)
    }

    const job = await JobsModel.findOne({ _id: id })
    if (!job) {
        return res.status(400).send({ "message": `No job found with ${id} id` })
    }

    if (req.user.userId != job.createdBy.toString()) {
        return res.status(400).send({ "message": "You are not authorized person to update this record" })
    }

    const response = await JobsModel.updateOne({ _id: id }, { company, position })
    if (response) {
        return res.status(200).send({ "message": "Job details updated", response })
    }
    else {
        return res.status(400).send({ "message": "You are not authorized person to update this record" })
    }


}


export const deleteJob = async (req, res) => {
    const id = req.params.id;

    const job = await JobsModel.findOne({ _id: id })
    if (!job) {
        return res.status(400).send({ "message": `No job found with ${id} id` })
    }

    if (req.user.userId != job.createdBy.toString()) {
        return res.status(400).send({ "message": "You are not authorized person to delete this record" })
    }

    const response = await JobsModel.deleteOne({ _id: id })
    if (response) {
        return res.status(200).send({ "message": "Job deleted successfully", response })
    }
    else {
        return res.status(400).send({ "message": "Server Error" })
    }

}


export const jobStatusController = async (req, res) => {
    console.log(req.user.userId)
    const stats = await JobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ])

    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    return res.status(200).send({ "total_records": stats.length, defaultStats })
}