import jwt from 'jsonwebtoken'
import { env } from '../env'
import UserModel from '../models/usersModel'
import { Response, NextFunction} from "express";
import { IUser } from '../types/users';
import { AuthRequest } from '../types/express';

interface JwtPayload {
    id: string
}


const authorization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const { id } = await jwt.verify(token, env.JWT_SECRET!) as JwtPayload
             req.user = await UserModel.findById(id).select("-password").select("-createdAt").select("-updatedAt") as IUser
             next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }
};

export default authorization