import { Router } from "express";
import { changeProfilePic, loginUser, logoutUser, registerUser, resetPassword, sendPassswordResetOtp, sendVerifyEmailOtp, updatePassword, verifyEmailOtp, verifyUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/token-manager.js";
import upload, { uploadToCloudinary } from "../middlewares/multer.js";


const userRouter = Router()

userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/is-auth',verifyToken,verifyUser)
userRouter.get('/send-email-otp',verifyToken,sendVerifyEmailOtp)
userRouter.post('/verify-email-otp',verifyToken,verifyEmailOtp)
userRouter.post('/forgot-password',sendPassswordResetOtp)
userRouter.post('/reset-password',resetPassword)
userRouter.post('/update-password',verifyToken,updatePassword)
userRouter.post('/logout',verifyToken,logoutUser)
userRouter.post('/update-profile-pic', verifyToken, upload.single('profile'),uploadToCloudinary("Melodify"), changeProfilePic);



export default userRouter;