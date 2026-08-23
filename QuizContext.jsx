import React from "react";
import { useState, createContext } from "react";

function QuizLogic(){
 const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [showResult, setShowResult] = useState(false);
const [loading , setLoading] = useState()

const getApi = 
try {
    async () => fetch ('https://opentdb.com/api.php')

const respone = await 

    
} catch (error) {
    
}
}