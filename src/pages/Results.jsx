import { useState, useContext, useMemo } from "react";
import { ArrowLeft, Check, ChevronDown, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext.jsx";

function decodeHtml(html) {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function ResultStat({ label, value, detail }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

function Results() {
  const navigate = useNavigate();
  const { questions = [], selectedAnswers: ctxSelected = {}, restartQuiz } = useContext(QuizContext);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    return { ...(ctxSelected || {}) };
  });

  const totalQuestions = questions.length;

  const score = useMemo(() => {
    if (!questions.length) return 0;
    let s = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] && selectedAnswers[idx] === q.correct_answer) s++;
    });
    return s;
  }, [questions, selectedAnswers]);

  const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

  function handleSelect(index, answer) {
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  }

  function handleTryAgain() {
    if (typeof restartQuiz === "function") {
      restartQuiz().catch(() => {});
    }
    navigate("/quiz");
  }

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
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your results</h1>
            <p className="mt-3 text-slate-300">Here is your result! Review each response or take another attempt.</p>
          </div>
          <div className="mt-9 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Final score</p>
              <p className="mt-1 text-6xl font-bold tracking-tight">{score}<span className="text-3xl text-slate-500">/{totalQuestions}</span></p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-slate-400">Percentage</p>
              <p className="mt-1 text-4xl font-bold text-cyan-300">{percentage}%</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultStat label="Correct answers" value={score} detail="Questions answered correctly" />
          <ResultStat label="Incorrect answers" value={totalQuestions - score} detail="Questions to revisit" />
          <ResultStat label="Completion" value={`${totalQuestions}/${totalQuestions}`} detail="All questions attempted" />
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
              {questions.length === 0 && (
                <div className="p-6 text-sm text-slate-500">No questions available to review.</div>
              )}

              {questions.map((question, idx) => {
                const options = [question.correct_answer, ...(question.incorrect_answers || [])];
                // keep options stable across renders by sorting alphabetically; this avoids re-shuffling on each render
                const sortedOptions = options.slice().sort();
                const selected = selectedAnswers[idx];

                return (
                  <div key={idx} className="border-b border-slate-100 px-6 py-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">Question {idx + 1}</h3>
                        <p className="mt-2 text-sm text-slate-700">{decodeHtml(question.question)}</p>
                      </div>
                      <div className="text-sm text-slate-400">{question.difficulty && <span className="capitalize">{question.difficulty}</span>}</div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {sortedOptions.map((opt) => {
                        const isSelected = selected === opt;
                        const isCorrect = opt === question.correct_answer;

                        let classes = "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition";
                        if (isSelected && isCorrect) {
                          classes += " bg-green-50 border-green-300 text-green-800";
                        } else if (isSelected && !isCorrect) {
                          classes += " bg-red-50 border-red-300 text-red-800";
                        } else {
                          classes += " bg-white border-slate-200 hover:bg-slate-50";
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            className={classes}
                            onClick={() => handleSelect(idx, opt)}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="truncate">{decodeHtml(opt)}</span>
                              {isCorrect && (isSelected ? <span className="ml-2 text-xs font-semibold text-green-700">Correct</span> : <span className="ml-2 text-xs font-semibold text-green-500">Answer</span>)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleTryAgain}
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