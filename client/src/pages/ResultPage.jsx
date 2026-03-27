import { useLocation, useNavigate } from 'react-router-dom'

function ResultPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const match = location.state?.match
    
    if (!match) {
        return (
            <div>
                <p>No match found. Take the quiz!</p>
                <button onClick={() => naviagate('/quiz')}>Take the Quiz</button>
            </div>
        )
    }

    return (
        <div>
            <h1>We found your purrfect match!</h1>
            <p>{match.cat.breed} | {match.cat.age} years old | {match.cat.energy_level} energy</p>
            <p>{match.cat.personality}</p>
            <h3>Why you're a match</h3>
            <p>{match.reason}</p>
            <button onClick={() => navigate('/quiz')}>Retake Quiz</button>
        </div>
    )
}

export default ResultPage