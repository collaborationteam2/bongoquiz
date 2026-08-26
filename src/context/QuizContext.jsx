import { useEffect, useState, createContext } from "react";
import { fetchQuizData } from "../modules/quizApi";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  
  const getApi = async () => {
    setLoading(true);

    try {
      const data = await fetchQuizData(10);

      setQuestions(data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getApi();
  }, []);

  
  const selectAnswer = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };


  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateScore();
      setQuizCompleted(true);
    }
  };

  
  const calculateScore = () => {
    let finalScore = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        finalScore++;
      }
    });

    setScore(finalScore);
  };

 
  const restartQuiz = async () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);

    await getApi();
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        selectedAnswers,
        score,
        loading,
        quizCompleted,
        selectAnswer,
        nextQuestion,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };