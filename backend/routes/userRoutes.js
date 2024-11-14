import express from 'express';
const userRouter = express.Router();
import { 
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    fetchUserDatas,
    profileEdit,
    deleteImage
 } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/fetchUserData',fetchUserDatas)

userRouter.post('/editProfile',profileEdit)
userRouter.post('/deleteImage',deleteImage)
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

userRouter.post('/logout',logoutUser)

export default userRouter;