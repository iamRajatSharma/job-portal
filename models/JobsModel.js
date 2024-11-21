import mongoose from "mongoose";
import z, { string } from "zod"

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
    },
    position: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Reject', 'Interview'],
        default: "Pending"
    },
    type: {
        type: String,
        enum: ['FullTime', 'PartTime', 'Internship', 'Contract'],
        default: "FullTime"
    },
    location: {
        type: String,
        default: "Delhi"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timeseries: true
})

export const JobValidation = z.object({
    company: z.string().min(4, "Name must be greater than 4 character").max(16, "Name can't be greater than 16 character"),
    position: z.string().min(4, "Position must be greater than 4 character").max(16, "Name can't be greater than 16 character")
})


export default mongoose.model("Jobs", JobsSchema)
