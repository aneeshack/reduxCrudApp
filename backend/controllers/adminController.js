import User from '../models/userModel.js'
// import generateToken from '../utils/generateToken.js';

 
const fetchUserData = async(req, res) => {
    try {
        console.log('fetch user data')
        const { search } = req.query;
        let query  = {role: {$ne: 'Admin'}};
        if(search){
            query.name = {$regex: new RegExp(search , 'i')}
        }
        const data = await User.find(query);
        res.json({ data: data })
    } catch (error) {
        console.log('error in fetching data')
        res.status(401).json({error:error})
    }
}

    const editUser = async (req, res) => {
    try {
      console.log('inside',req.body);
      const { name, email,_id } = req.body;
      const userIs = await User.findOne({ _id: _id });
      console.log('useris,',userIs)
      if (userIs) {
        const userData = await User.updateOne({ _id }, { $set: { name,email } });
        console.log('userdata:',userIs)
        res.json({ success: true,userIs });
      } else {
        res.json({ ErrorEdit: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

    const addUserAdmin = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const CheckUserIn = await User.findOne({ email: email });
      if (CheckUserIn) {
        res.json({ CheckError: true });
      } else {
        const userData = new User({
          name: name,
          email,
          role: "User",
          password: password,
        });
        const user = await userData.save();
        res.json({ success: true ,user});
      }
    } catch (err) {
      console.log(err);
    }
  }

const deleteUser = async(req, res)=>{
    try {
        console.log(req.body)
        const {data} = req.body;
        const userIn = await User.findOne({_id:data})

        if(userIn?.status === 'Active'){
            await User.updateOne({_id:data}, {$set: {status:'Block'}})
            res.json({success:true})
        }else if(userIn?.status == 'Block'){
            await User.updateOne({_id:data},{$set:{status :'Active'}})
            res.json({success:true})
        }else{
            console.log('user id is not correct',error)
            res.status(401).json({message:'user id not match'})
        }
    } catch (error) {
        console.log('error in delete user:',error)
        res.status(401).json({message:'Error in delete'})

    }
}


const logoutAdmin = async (req, res) => {
    try {
        res.cookie('jwt', '',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({ message: 'admin logged out'})
    } catch (error) {
        res.status(404).json({message: 'admin not logout'})
    }
  
}

export {
    logoutAdmin,
    fetchUserData,
    deleteUser,
    editUser,
    addUserAdmin
}