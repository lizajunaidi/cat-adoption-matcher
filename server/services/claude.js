import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

export const matchCatWithUser = async (answers, cats) => {
    const userProfile = Object.entries(answers)
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n')

    const catList = cats.map((cat, i) =>
        `${i + 1}. ID: ${cat.id} | Name: ${cat.name} | Age: ${cat.age} | Breed: ${cat.breed} | Energy: ${cat.energy_level} | Personality: ${cat.personality}`
    ).join('\n')

    const prompt = `You are a cat adoption specialist. Based on the user's personality quiz answers, select the single best matching cat from the list below.

    User profile:
    ${userProfile}

    Available cats:
    ${catList}

    Choose the cat that would be the best fit for this person's lifestyle and personality.
    Respond ONLY with valid JSON in this exact format, no other text:
    {
    "catId": "<the cat's id>",
    "catName": "<the cat's name>",
    "reason": "<2-3 sentences explaining why this cat is a great match for this specific person>"
    }`

    const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
    })

    const responseText = message.content[0].text.trim()

    const parsed = JSON.parse(responseText)

    const matchedCat = cats.find(c => c.id === parsed.catId)
    if (!matchedCat) {
        throw new Error(`Claude returned an unknown cat ID: ${parsed.catId}`)
    }

    return {
        cat: matchedCat,
        reason: parsed.reason
    }
}