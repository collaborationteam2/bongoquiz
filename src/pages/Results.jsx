import { useState } from "react";
import { ArrowLeft, Check, ChevronDown, RotateCcw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function resultData() {
  return {
    quizTitle: {`${localStorage.getItem("quizTitle")}`},
    score: {parseInt(localStorage.getItem("score"))},
    totalQuestions: {parseInt(localStorage.getItem("totalQuestions"))},
    questions: JSON.parse(localStorage.getItem("questions")) || [],
  };
}


function ResultStat({ label, value, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

export default Results;