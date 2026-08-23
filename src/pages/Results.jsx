import { useState } from "react";
import { ArrowLeft, Check, ChevronDown, RotateCcw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function resultData() {
  return {
    quizTitle: {`${localStorage.getItem("quizTitle")}`},
    score: {parseInt(localStorage.getItem("score"))},
    totalQuestions: {parseInt(localStorage.getItem("totalQuestions"))},
    questions: JSON.parse(localStorage.getItem("questions")) || [],
  }};



export default Results;