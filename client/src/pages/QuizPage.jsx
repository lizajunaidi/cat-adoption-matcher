import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QUESTIONS = [
    {
        id: 'energy',
        question: 'How would you describe your energy level?',
        options: ['Very calm', 'Relaxed but active', 'Average', 'Very active']
    },
    {
        id: 'affection',
        question: 'What kind of cat do you feel fits you best in terms of how affectionate they are?',
        options: ['Cuddly, lapcat', 'Affectionate but not clingy', 'Independent, but friendly', 'A lone wolf']
    },
    {
        id: 'noise',
        question: 'What noise level do you most prefer?',
        options: ['I love noisy cats', 'I do not mind mind a talker', 'I prefer mostly quiet', 'I like silence best']
    },
    {
        id: 'space',
        question: 'What is your living situation?',
        options: ['Small apartment', 'Medium apartment', 'House']
    },
    {
        id: 'experience',
        question: 'Have you owned cats before',
        options: ['Never owned cats', 'Had cats as a kid', 'Owned a cat before', 'Very experienced with cats and/or have owned multiple']
    },
    {
        id: 'kids_pets',
        question: 'Do have small children or pets?',
        options: ['No', 'Cat(s)', 'Dog(s)', 'Young children']
    },
    {
        id: 'play',
        question: 'How much time can you dedicate to play each day?',
        options: ['15 - 30 min', 'Over 30 min']
    },
    {
        id: 'temperament',
        question: 'Which personality type appeals to you the most',
        options: ['Gentle and calm', 'Playful and silly', 'Curious and Adventurous', 'Adaptable and Chill', 'Mysterious and Independent']
    }
]

function QuizPage() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const question = QUESTIONS[currentStep]

    const handleSelect = async (option) => {
        const newAnswers = { ...answers, [question.id]: option }
        setAnswers(newAnswers)
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:3001/api/match', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: newAnswers })
                })
                const match = await response.json()
                navigate('/result', { state: { match } })
            } catch (err) {
                setError('Something went wrong. Please try again.')
                setLoading(false)
            }
        }
    }
    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1)
    }

    if (loading) return <h2>Finding your purrfect cat...</h2>

    return (
        <div>
            <p>
                Question {currentStep + 1} of {QUESTIONS.length}
            </p>
            <h2>{question.question} </h2>
            {error && <p>{error}</p>}
            <div>
                {question.options.map(option => (
                    <button key={option} onClick={() => handleSelect(option)}>
                        {option}
                    </button>
                ))}
            </div>
            {currentStep > 0 && (
                <button onClick={handleBack}>Back</button>
            )}
        </div>
    )
}
export default QuizPage
