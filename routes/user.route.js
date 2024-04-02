import express from 'express'
import { createUser, getAllUsers, getSingleUser, updateSingleUser } from '../controllers/users.controller.js'

const router = express.Router()

router.get("/get-all-users",getAllUsers)
router.post("/create-user",createUser)
router.get("/single-user/:userId",getSingleUser)
router.put("/update-single-user/:userId",updateSingleUser)


export default router