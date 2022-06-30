import { Model, Types } from "mongoose";
import { IUser } from "../types/users";
import generateToken from "../utils/generateToken";

export class usersService {
    constructor(private usersModel: Model<IUser>) {}

    loginService = async (email: string, password: string) => { 
        const user = await this.usersModel.findOne({email})
        if(user && (await user.matchPassword(password))){
            return {
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                }
            }
        } else {
            return {
                success: false,
                msg: new Error('email or password not matched')
            }
        }
    }

    getProfile = async (id: Types.ObjectId) => {
        const userProfile = await this.usersModel.findById(id).select("-password").select("-createdAt").select("-updatedAt")
        if (userProfile) {
            return {
                success: true,
                data: userProfile
            }
        } else {
            return {
                success: false,
                msg: new Error('No userProfile')
            }
        }
    }
}