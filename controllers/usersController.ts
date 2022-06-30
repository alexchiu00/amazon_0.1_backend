import { UsersService } from '../services/usersService';
import { AuthRequest } from '../types/express';
import { Request, Response} from "express";

export class UsersController {
    constructor(private usersService: UsersService){}

    login = async (req: Request, res: Response ) => {
        const { email ,password } = req.body
        try {
            const result = await this.usersService.loginService(email, password);
            res.status(200).json(result)
        } catch (error) {
            res.status(401).json({
                success: false,
                error: new Error(error.message)
            })
        }
    }

    getProfile = async ( req: AuthRequest, res: Response ) => {
        try {
            const result = await this.usersService.getProfile(req.user._id)
            res.status(200).json(result)
        } catch (error) {
            res.status(401).json({
                success: false,
                error: new Error(error.message)
            })
        }
    }
}