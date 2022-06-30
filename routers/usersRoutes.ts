import express from 'express'
import authorization from '../middleware/authMiddleware'
import { usersController } from '../server'
import { AuthRequest } from '../types/express'


const usersRoutes = express.Router()

usersRoutes.post('/api/auth/login' ,(req, res) => {
    usersController.login(req, res)
}) 

usersRoutes.get('/api/profile', authorization ,(req, res) => {
    usersController.getProfile(req as AuthRequest, res)
})

export default usersRoutes