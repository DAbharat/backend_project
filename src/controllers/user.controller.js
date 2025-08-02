import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    const{username, email, password} = req.body
    console.log("email: ", email);

    if (
        [
           fullName, email, username, password 
        ].some(() => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fileds are required")
    }

    const userExists = User.findOne({
        $or: [{username}, {email}]
    })

    if(userExists) {
        throw new ApiError(409, "User with same username or email already exists")
    }

    const profileLocalPath = req.files?.profile[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile image is required")
    }

    const profile = await uploadOnCloudinary(profileLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!profile) {
        throw new ApiError(400, "Profile image is required")
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

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered!")
    )

})



export {registerUser};