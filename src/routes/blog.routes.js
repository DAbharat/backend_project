import { Router } from 'express';
import {
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublishStatus
} from "../controllers/blog.controller.js"; 

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .get(getAllBlogs)
    .post(createBlog);

router
    .route("/:blogId")
    .get(getBlogById)
    .patch(updateBlog)
    .delete(deleteBlog);

router
    .route("/toggle/publish/:blogId")
    .patch(togglePublishStatus);

export default router;
