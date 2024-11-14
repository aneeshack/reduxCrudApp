import express from 'express';
const adminRouter = express.Router();
import {
    logoutAdmin,
    fetchUserData,
    deleteUser,
    editUser,
    addUserAdmin
} from '../controllers/adminController.js';



adminRouter.get('/fetchUserAdmin',fetchUserData)
adminRouter.post('/editUser',editUser)
adminRouter.post('/addUserAdmin',addUserAdmin)
adminRouter.post('/deleteUser',deleteUser)
adminRouter.post('/logout',logoutAdmin)


export default adminRouter