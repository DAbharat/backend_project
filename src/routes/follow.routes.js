import { Router } from 'express';
import {
    getFollowedPages,
    getUserPageFollowers,
    toggleFollow,
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:postId")
    .get(getFollowedPages)
    .post(toggleFollow);

router.route("/u/:subscriberId").get(getUserPageFollowers);

export default router