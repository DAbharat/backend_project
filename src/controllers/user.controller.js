import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong")
    }
}


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

    //const profileLocalPath = req.files?.profile[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let profileLocalPath;
    if (req.files && Array.isArray(req.files.profile) && req.files.profile.length > 0) {
        profileLocalPath = req.files.profile[0].path
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    // if (!profileLocalPath) {
    //     throw new ApiError(400, "Profile image is required")
    // }

    let profile = null;
    if (profileLocalPath) {
        profile = await uploadOnCloudinary(profileLocalPath);
    }

    let coverImage = null;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    // if (!profile) {
    //     throw new ApiError(400, "Profile image is required")
    // }

    // if (!req.files || !req.files.profile || req.files.profile.length === 0) {
    //     throw new ApiError(400, "Profile image not uploaded correctly");
    // }

    const user = await User.create({
        fullName,
        profile: profile?.url || "",
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

const loginUser = asyncHandler(async (req,res) => {

    const {email, password, username} = req.body

    if(!username || !email) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                //data
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out Successfully")
    )
})

export { 
    registerUser,
    loginUser,
    logoutUser 
};