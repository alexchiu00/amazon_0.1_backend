import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {
        expiresIn: '60d'
    })
}

export default generateToken