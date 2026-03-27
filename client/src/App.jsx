import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/quiz" element={<QuizPage />}/>
            <Route path="/result" element={<ResultPage />}/>
        </Routes>
    )
  }
  export default App

