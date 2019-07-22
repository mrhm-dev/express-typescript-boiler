import { Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'


import User from '../models/User'

export const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        let users: Array<Document> = await User.find()
        res.json(users)
    } catch (e) {
        next(e)
    }
}