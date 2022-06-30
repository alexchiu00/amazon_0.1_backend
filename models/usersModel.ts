import { Schema, model } from "mongoose";
import { IUser } from "../types/users";
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

// methods
UserSchema.methods.matchPassword = async function(inputPassword:string){
    return await bcrypt.compare(inputPassword, this.password);
}



const UserModel = model<IUser>('users', UserSchema)
export default UserModel