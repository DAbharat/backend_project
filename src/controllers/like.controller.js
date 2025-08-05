import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const userId = req.user?._id

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID")
    }

    const existingLike = await Like.findOne({
        post: postId,
        likedBy: userId
    })

    if (existingLike) {
        await Like.findOneAndRemove({
            post: postId,
            likedBy: userId
        })
        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Post unliked")
            )
    }

    const newLike = await Like.create({
        post: postId,
        likedBy: userId
    })
    return res
        .status(200)
        .json(
            new ApiResponse(200, newLike, "Post liked")
        )
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const userId = req.user?._id

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    })

    if (existingLike) {
        await Like.findOneAndRemove({
            comment: commentId,
            likedBy: userId
        })

        return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Comment unliked")
        )
    }

    const newLike =  await Like.create({
        comment: commentId,
        likedBy: userId
    })
    return res
    .status(200)
    .json(
        new ApiResponse(200, newLike, "Comment liked successfully")
    )
})

export {
    toggleCommentLike,
    togglePostLike
}