import mongoose, { isValidObjectId, Types } from "mongoose"
import { User } from "../models/user.model.js"
import { follow } from "../models/follow.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleFollow = asyncHandler(async (req, res) => {
    const { pageId } = req.params
    const followerId = req.user?._id

    if (!isValidObjectId(pageId)) {
        throw new ApiError(400, "Invalid page ID")
    }

    if (followerId.toString() === pageId.toString()) {
        throw new ApiError(400, "You cannot follow yourself")
    }

    const existingFollower = await follow.findOne({
        page: pageId,
        follower: followerId
    })

    if (existingFollower) {
        await follow.deleteOne({
            page: pageId,
            follower: followerId
        });

        return res
            .status(200)
            .json(new ApiResponse(200, null, "unfollowed successfully"))
    }

    const newFollow = await follow.create({
        page: pageId,
        follower: followerId
    })

    return res.status(200).json(new ApiResponse(201, newFollow, "Followed Successfully"))
})

const getUserPageFollowers = asyncHandler(async (req, res) => {
    const { pageId } = req.params

    if (!isValidObjectId(pageId)) {
        throw new ApiError(400, "Invalid page ID")
    }

    const followers = await follow.aggregate([
        {
            $match: {
                page: new mongoose.Types.ObjectId(String(pageId))
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "follower",
                foreignField: "._id",
                as: "followers",
                pipeline: [
                    {
                        $project: {
                            profile: 1,
                            fullName: 1,
                            username: 1
                        }
                    }
                ]
            }
        },
        {
            $set: {
                followers: { $arrayElemAt: ["$followers", 0] }
            }
        }

    ])

    if (!followers?.length) {
        return res.status(200).json(new ApiResponse(200, [], "No followers found"))
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, followers, "Followers fetched successfully")
        )
})

const getFollowedPages = asyncHandler(async (req, res) => {
    const { followerId } = req.params

    if (!isValidObjectId(followerId)) {
        throw new ApiError(400, "Invalid follower ID")
    }

    const followedPages = await follow.aggregate([
        {
            $match: {
                follower: new mongoose.Types.ObjectId(String(followerId))
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "page",
                foreignField: "._id",
                as: "followedPages",
                pipeline: [
                    {
                        $project: {
                            profile: 1,
                            fullName: 1,
                            username: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                $first: "$followedPages"
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, followedPages, "Followed pages fetched successfully")
        )
})

export {
    toggleFollow,
    getUserPageFollowers,
    getFollowedPages
}