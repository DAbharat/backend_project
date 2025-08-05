import mongoose, { isValidObjectId } from "mongoose"
import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getAllBlogs = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "" } = req.query

    const blogs = await Blog.aggregate([
        {
            $match: {
                isPublished: true,
                ...(query && {
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { blog: { $regex: query, $options: "i" } }
                    ]
                })
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" }
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit)
        },
        {
            $limit: parseInt(limit)
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, blogs, "Blogs fetched successfully")
    )
})

const createBlog = asyncHandler(async (req, res) => {
    const { title, blog } = req.body

    if (!title || !blog) {
        throw new ApiError(400, "Title and blog content are required")
    }

    const newBlog = await Blog.create({
        title,
        blog,
        owner: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(201, newBlog, "Blog created successfully")
    )
})

const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params

    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid blog ID")
    }

    const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { views: 1 } },
        { new: true }
    ).populate("owner", "username fullName avatar")

    if (!blog) {
        throw new ApiError(404, "Blog not found")
    }

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog fetched successfully")
    )
})

const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const { title, blog } = req.body

    const existingBlog = await Blog.findById(blogId)

    if (!existingBlog) {
        throw new ApiError(404, "Blog not found")
    }

    if (existingBlog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to update this blog")
    }

    if (title) existingBlog.title = title
    if (blog) existingBlog.blog = blog

    await existingBlog.save()

    return res.status(200).json(
        new ApiResponse(200, existingBlog, "Blog updated successfully")
    )
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    if (!blog) {
        throw new ApiError(404, "Blog not found")
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to delete this blog")
    }

    await Blog.findByIdAndDelete(blogId)

    return res.status(200).json(
        new ApiResponse(200, null, "Blog deleted successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)

    if (!blog) {
        throw new ApiError(404, "Blog not found")
    }

    if (blog.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized to update publish status")
    }

    blog.isPublished = !blog.isPublished
    await blog.save()

    return res.status(200).json(
        new ApiResponse(200, blog, `Blog ${blog.isPublished ? "published" : "unpublished"}`)
    )
})

export {
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublishStatus
}
