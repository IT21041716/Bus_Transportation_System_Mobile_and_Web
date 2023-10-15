import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const topupSchema = new Schema({

    PID: {
        type: String,
        required: true,
    },
    UID: {
        type: String,
        required: true,
    },
    smartCardID: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

}, { timestamps: true })

export default mongoose.model("topUp", topupSchema);