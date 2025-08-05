import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params
    let { page = 1, limit = 10 } = req.query
    if (!postId) {
        throw new ApiError(400, "Post is required")
    }

    page = parseInt(page)
    limit = parseInt(limit)

    const options = {
        page,
        limit
    }

    const aggregateOptions = [
        {
            $match: {
                post: new mongoose.Types.ObjectId(String(postId))
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "._id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            profile: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                likeCount: {
                    $size: "$likes"
                },
                user: {
                    $first: "$user"
                },
                isLiked: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$likes.likedBy"]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        }
    ]

    const comments = await Comment.aggregatePaginate(aggregateOptions, options)

    if (!comments || !comments.docs || !comments.docs.length) {
        throw new ApiError(404, "No comments found for this post")
    }


    return res
        .status(200)
        .json(
            new ApiResponse(200, comments, "Comments fetched successfully")
        )
})

const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const { content } = req.body
    const userId = req.user?._id

    if (!(postId || content)) {
        throw new ApiError(400, "Post ID and comment content are required")
    }

    const newComment = await Comment.create({
        post: postId,
        user: userId,
        content
    })

    const createdComment = await Comment.findById(newComment._id)

    if (!createdComment) {
        throw new ApiError(500, "Failed to create comment")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, newComment, "Comment added successfully")
        )
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body
    const userId = req.user?._id

    if (!(commentId || content)) {
        throw new ApiError(400, "Comment Id and comment content are required")
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError("Comment not found")
    }

    if (comment.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized user not allowed to change the comment")
    }

    comment.content = content
    await comment.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comment updated successfully")
        )
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    const userId = req.user?._id

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if (comment.user.toString() !== userId.toString()) {
        throw new ApiError(403, "unauthorized to delete this comment")
    }

    await Like.deleteMany({ comment: commentId });
    await Comment.findByIdAndDelete(commentId)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Comment deleted successfully")
        )
})

export {
    getPostComments,
    addComment,
    updateComment,
    deleteComment
}
