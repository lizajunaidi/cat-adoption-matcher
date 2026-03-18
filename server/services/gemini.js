import { GoogleGenerativeAI } from '@google/generative-ai'

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

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
    "catName": <the cat's name>",
    "reason": "<2-3 sentences explaining why this cat is a great match for this specific person>"
    }`

    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    const parsed = JSON.parse(responseText)

    const matchedCat = cats.find(c => c.id === parsed.catID)

    if (!matchedCat) {
        throw new Error(`Claude returned an unknown cat ID: ${parsed.catID}`)
    }

    return {
        cat: matchedCat,
        reason: parsed.reason
    }
}