import Anthropic from 'anthropic-ai/sdk'

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export const matchCatWithUser = async (answers, cats) => {
    const userProfile = Object.entries(answers)
    .map(([key, value]))
}