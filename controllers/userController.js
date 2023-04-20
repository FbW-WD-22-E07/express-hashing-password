import UserCollection from "../models/userSchema.js"
import bcrypt from "bcrypt"

export const getAllUsers= async (req,res)=>{
    //request handler
    //controller
    try{
        const users = await UserCollection.find()
        res.json(users)
    }
    catch(err){
        res.json({errorMessage:err.message})
    }
  
}

export const createUser=async(req,res)=>{
    try{
        //password hashing
       /*  "abcdef" => "ksgdr2k3jg4h23f52f52gd5hd54w4cnry$%§%§$534"
        //adding salt
        "abcdef"+"$jhssgdjdu§" => "dsfdsgsdgsdgs$%$&5365364573213213132"
        "abcdef"+"%sajadakjs" => "öasdhflafdgaerug34325jg24643636b5kj6" */
        /* const hashedPassword = bcrypt.hashSync(req.body.password ,10 ) */


        /* const user = await UserCollection.create({...req.body, password:hashedPassword}) */
        const user = new UserCollection(req.body)
        await user.save()
        res.json(user)
    }
    catch(err){
        res.json({errorMessage:err.message})
    }
    
}


export const loginUser=async (req,res)=>{
    try{
        const {email, password} = req.body
        //123

        const user = await UserCollection.findOne({email})
       // user.password => "ajfaekjrgjekgkwg54k454§&§%&/%/§"
        if(user){
            const check = bcrypt.compareSync(password, user.password) //returns boolean
           /*  const check = await user.comparePassword(password) */
            if(check){
                res.json({message:"you loggedin successfully!"})
            }else{
                res.json({message:"password doesn't match.."})
            }
        }else{
            res.json({message:"email doesn't exist!"})
        }
    }
    catch(err){
        res.json({errorMessage:err.message})
    }
}


export const updateUser=async (req, res) => {
    try {
      const updatedUser = await UserCollection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  export const deleteUser=async(req,res)=>{
    try{
        const deletedUser= await UserCollection.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    }
    catch(err){
        res.json({ message: err.message });
    }
  }