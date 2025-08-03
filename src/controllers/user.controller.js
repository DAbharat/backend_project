import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All files are required")
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExists) {
        throw new ApiError(409, "User with same username or email already exists")
    }

    console.log("req.files:", req.files);

    const profileLocalPath = req.files?.profile[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile image is required")
    }

    const profile = await uploadOnCloudinary(profileLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!profile) {
        throw new ApiError(400, "Profile image is required")
    }

    if (!req.files || !req.files.profile || req.files.profile.length === 0) {
        throw new ApiError(400, "Profile image not uploaded correctly");
    }

    const user = await User.create({
        fullName,
        profile: profile.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    console.log("User created:", user);

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered!")
    )

})



export { registerUser };