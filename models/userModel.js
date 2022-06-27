import mongoose,{Schema} from "mongoose";
import { CartSchema } from "./cartModel";
 
export const UserSchema = new Schema({
    email:{
        type:String,
        required:"Please enter Email Address"
    },
    password:{
        type:String,
        required:"Please enter Password"
    },
    name: {
        type:String,
        required:"Please enter Full Name"
    },
    cart:CartSchema,
    createdat:{
        type:Date,
        default:Date.now
    }

});
const User = mongoose.model("User", UserSchema);
export default User;
