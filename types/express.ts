import { IUser } from "./users";
import { Request } from 'express'

interface AuthRequest extends Request {
    user: IUser
}

export type { AuthRequest }