import express from 'express'
import { createTeam, getTeamDetails, getTeams, getUniqueDomains } from '../controllers/team-controller.js'

const router = express.Router()

router.post("/create-team",createTeam)
router.get("/get-team/:id",getTeamDetails)
router.get("/get-teams",getTeams)
router.get("/get-domains",getUniqueDomains)


export default router