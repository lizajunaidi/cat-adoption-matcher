import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>PetPals</h1>
            <p>Complete our quiz and we will match you with a Purrfect cat!</p>
            <button onClick={() => navigate('/quiz')}>
                Take The Cat Match Quiz
            </button>
        </div>
    )
}

export default Home