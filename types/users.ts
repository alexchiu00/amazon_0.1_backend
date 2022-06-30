import { Types } from "mongoose"

interface IUser {
    _id: Types.ObjectId
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    matchPassword: (password: string) => boolean
}

export type { IUser }