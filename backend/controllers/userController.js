import User from '../models/userModel.js'; 
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';



// user is registered and first user set to admin
const registerUser = async(req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name || !email || !password){
           return res.status(401).json({Error:'imcomplete credentials'})
        }
       
        const firstUser = await User.findOne();
       
        const role = firstUser ? 'User' : 'Admin';
        const userExist = await User.findOne({email})

        if(userExist){
           return res.status(400).json({Error:"user already exist"})
        }
        
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        console.log('user',user)
        if(user){
            generateToken(res, user._id)
            res.status(201).json({success:true,user})
             
        }else{
            res.status(400).json({Error:"error in user jwt"})
        }
    } catch (error) {
        res.status(400).json({Error: 'Server error'})
        console.log(error)
    }
}

// user login function
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({success:true,user})
    }else{
       return res.status(401).json({ message:'invalid email or password'})
    }
    } catch (error) {
        res.status(401).json({error:error})
        console.log('login user error:',error)
    }
}
 
const fetchUserDatas = async (req, res) => {
    try {
        
      let token = req.cookies.jwt;
   

      if(!token){
        console.log('Null token')
        return res.status(401).json({ message: 'Unauthorized :Token not provided'})
      }

      let verifiedDecoded;
      try {
        verifiedDecoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        return res.status(401).json({ error: 'Token is not valid'})
      }

      const userData = await User.findById(verifiedDecoded.userId)

      if(!userData){
        return res.status(404).json({message: 'User not found'})

      }

      res.json(userData)

    } catch (error) {
        console.log('error in fetching data:',error)
        res.status(500).json({error:'Internal server error.'})
    }
}

 const profileEdit = async(req,res) => {
    try {
        console.log('inside profile edit',req.body)
        const {name, email, phone, _id,image} = req.body;
        const userInfo = await User.findOne({_id :_id})
        console.log('userinfo',userInfo)
        if(userInfo){
            await User.updateOne(
                { _id:_id},
                {email:email, name:name, phone:phone,image:image}
            )
            res.json({success:true})
        }else{
            console.log('Mistake in editing')
            res.json({success:false, message:'User not found.'})
        }

    } catch (error) {
        console.log('error in editing:',error)
        res.json({success:false, message: 'Error in Editing Profile'})
    }
 }

 const deleteImage = async (req, res) => {

    try {
      let token = req.cookies.jwt;

      if (!token) {
        console.log('null token')
        return res.status(401).json({ error: "No token provided" });
      }

      const verifydecoded = jwt.verify(
        token,
        process.env.JWT_SECRET 
      ) ;

      if (!verifydecoded) {
        return res.status(401).json({ error: "Token is not valid" });
      }
      const { id } = req.body;

     
      const userIn = await User.findById(id);
      

      if (userIn) {
        await User.updateOne(
          { _id: id },
          { $set: { image: null } }
        );
        res.json({ success: true });
      } else {

        res.json({ ErrorDelete: true });
        console.error("The is not valid");
      }
    } catch (err) {
      console.log(err);
    }
  }

const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', '',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({ message: 'user logged out'})
    } catch (error) {
        res.status(404).json({message: 'user not logout'})
    }
  
}

const getUserProfile = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email : req.user.email
    }
    res.status(200).json({user})
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email

            if(req.body.password){
                user.password = req.body.password
            }
            const updatedUser = await user.save()
            res.status(200).json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email: updatedUser.email
            })
            console.log(updatedUser)
        }else{
            res.status(404).json({ error: 'user not found'})
        }
    } catch (error) {
        res.status(404).json({message: 'user not found'})
    }
    
}

export {
    loginUser,
     registerUser,
     logoutUser,
     getUserProfile,
     updateUserProfile,   
     fetchUserDatas,
     profileEdit,
     deleteImage
}