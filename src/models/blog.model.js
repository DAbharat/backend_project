import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    blog: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, 
{
    timestamps: true
})



export const Blog = mongoose.model("Blog", blogSchema);