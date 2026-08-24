import { useState } from "react";
import { ArrowLeft, Check, ChevronDown, RotateCcw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function resultData() {
  return {
    quizTitle: localStorage.getItem("quizTitle"),
    score: parseInt(localStorage.getItem("score")),
    totalQuestions: parseInt(localStorage.getItem("totalQuestions")),
    questions: JSON.parse(localStorage.getItem("questions")) || [],
  };
}



function Results() {
  const navigate = useNavigate();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const percentage = Math.round((resultData.score / resultData.totalQuestions) * 100);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft size={17} />
          Back to home
        </button>

        <section className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl shadow-slate-200 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Quiz complete</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{resultData.quizTitle}</h1>
            <p className="mt-3 text-slate-300">Here is your result. Review each response or take another attempt.</p>
          </div>
          <div className="mt-9 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Final score</p>
              <p className="mt-1 text-6xl font-bold tracking-tight">{resultData.score}<span className="text-3xl text-slate-500">/{resultData.totalQuestions}</span></p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-slate-400">Percentage</p>
              <p className="mt-1 text-4xl font-bold text-cyan-300">{percentage}%</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultStat label="Correct answers" value={resultData.score} detail="Questions answered correctly" />
          <ResultStat label="Incorrect answers" value={resultData.totalQuestions - resultData.score} detail="Questions to revisit" />
          <ResultStat label="Completion" value={`${resultData.totalQuestions}/${resultData.totalQuestions}`} detail="All questions attempted" />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            aria-expanded={isReviewOpen}
            onClick={() => setIsReviewOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
          >
            <span>
              <span className="block text-base font-bold text-slate-950">Review answers</span>
              <span className="mt-1 block text-sm text-slate-500">See your answers alongside the correct ones</span>
            </span>
            <ChevronDown className={`shrink-0 text-slate-500 transition ${isReviewOpen ? "rotate-180" : ""}`} size={20} />
          </button>
          {isReviewOpen && (
            <div className="border-t border-slate-200">
              {resultData.questions.map((question) => <ReviewItem key={question.id} question={question} />)}
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            <RotateCcw size={17} />
            Try quiz again
          </button>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Choose another quiz
          </button>
        </div>
      </div>
    </main>
  );
}

export default Results;