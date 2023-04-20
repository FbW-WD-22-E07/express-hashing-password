import {Schema, model} from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
} ,{
    toJSON: { virtuals: true }
})

userSchema.virtual('fullname').get(function() {
    return this.firstName +" " + this.lastName;
  });

userSchema.pre("save",function(next){
    console.log("running before storing user")
    const hashedPassword = bcrypt.hashSync(this.password, 10)
    this.password = hashedPassword
    next()
})

/* userSchema.statics.findUserByToken=function(token){

} */

/* userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password, this.password) //returns boolean
} */

/* userSchema.post("save",function(){
    console.log("running after storing user")
})
 */

const UserCollection = model("users",userSchema)



export default UserCollection;