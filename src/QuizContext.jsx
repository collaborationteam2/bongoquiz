import React, { useEffect } from "react";
import { useState, createContext } from "react";

const QuizContext = createContext();

function QuizLogic({children}){
 const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [loading , setLoading] = useState()
const [quizCompleted , setQuizCompleted] = useState(false);

const getApi = async () => {
  setLoading(true);
;

try {
    const response = await fetch ('https://opentdb.com/api.php')

const data = await response.json()

setQuestions(data.results)

    
} catch (error) {
    console.log(`Failed to fetch questions`)
}finally{
    setLoading(false);
}}

useEffect(() => {
    getApi();
} , []);

const seleteAnswer = (answer) => {
    setSelectedAnswer((prev) => ({
        ...prev,
        [currentQuestion] : answer
    }))
}

const nextQuestion = () => {
if(currentQuestion < questions.length - 1){
    setCurrentQuestion((prev) => {prev + 1})
}else{
    calculateScore();
    setQuizCompleted(true);
}
}

const calculateScore = () => {
    let finalScore = 0;

    questions.forEach((question , index) => {
        if(selectedAnswer[index] === question.correct_answer){
            finalScore++
        }
    })
    setScore(finalScore)
}

const restartQuiz = async () => {
     setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizCompleted(false);

    await getApi()
}
return(
    <QuizContext.Provider value={ {
        questions,
        currentQuestion,
        selectedAnswers,
        score,
        loading,
        quizCompleted,
        selectAnswer,
        nextQuestion,
        restartQuiz
        }}>
            {children} 

    </QuizContext.Provider>
)
}

export default QuizContext;