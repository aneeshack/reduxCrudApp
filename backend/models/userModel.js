import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
// import { updateUserProfile } from "../controllers/userController";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phone:{
      type : String,
      required: false
    },
    role:{
      type: String,
      enum :[ 'Admin', 'User'],
      default: 'User'
    },
    status: {
      type: String,
      enum : ['Active', 'Block'],
      default : 'Active'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);
export default User;