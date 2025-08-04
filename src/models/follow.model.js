import mongoose, { Schema } from "mongoose";

const followSchema = new Schema({
    followers: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})



export const Follow = mongoose.model("Follow", followSchema);