import express from 'express'
import { matchCatWithUser } from '../services/claude.js'
import { getAvailableCats } from '../services/supabase.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { answers } = req.body

        if (!answers || Object.keys(answers).length === 0) {
            return res.status(400).json({error: 'No quiz answers provided'})
        }

        const cats = await getAvailableCats()

        if (cats.length === 0) {
            return res.status(404).json({error: 'No available cats'})
        }

        const match = await matchCatWithUser(answers, cats)

        res.json(match)
    } catch (err) {
        console.error('Match error:', err)
        res.status(500).json({error: 'Failed to find a match. Please try again.' })
    }
})

export default router
