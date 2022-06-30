import { logger } from "../logger";
import usersJson from "./users.json"
import UserModel from "../models/usersModel";
import bcrypt from 'bcrypt'

const createUsers = async () => {
    const data = await UserModel.find()
    if (data.length !== 0) {
        return
    }
    for (const user of usersJson) {
        const initUserModel = new UserModel({
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            isAdmin: user.isAdmin,
        })
    
        const result = await initUserModel.save()
        logger.info(result)
    }

}

export default createUsers