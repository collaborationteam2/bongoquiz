import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { ArrowLeft } from "lucide-react";

function decodeHtml(html) {
  if (!html) return "";

  const txt = document.createElement("textarea");
  txt.innerHTML = html;

  return txt.value;
}

function Quiz() {
  const navigate = useNavigate();

  const {
    questions,
    currentQuestion,
    selectedAnswers,
    selectAnswer,
    nextQuestion,
    loading,
    quizCompleted,
  } = useContext(QuizContext);

 
  if (loading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500"></div>
          <p className="text-slate-600 font-medium">
            Loading questions...
          </p>
        </div>
      </main>
    );
  }

 
  if (!questions || questions.length === 0) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            No questions available
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't load the quiz questions.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-400"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  
  if (quizCompleted) {
    navigate("/results");
    return null;
  }

  const question = questions[currentQuestion];

  const answers = [
    question.correct_answer,
    ...(question.incorrect_answers || []),
  ];

  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft size={17} />
          Back to home
        </button>

        
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
              Quiz
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              Question {currentQuestion + 1}
              <span className="text-slate-400">
                {" "}
                / {questions.length}
              </span>
            </h1>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            {Math.round(
              ((currentQuestion + 1) / questions.length) * 100
            )}
            %
          </div>
        </div>

       
        <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-300"
            style={{
              width: `${
                ((currentQuestion + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        
        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

          
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold capitalize text-cyan-700">
              {decodeHtml(question.category)}
            </span>

            <span className="text-sm font-medium capitalize text-slate-400">
              {question.difficulty}
            </span>
          </div>

          
          <h2 className="text-xl font-bold leading-relaxed text-slate-950 sm:text-2xl">
            {decodeHtml(question.question)}
          </h2>

          
          <div className="mt-8 grid gap-3">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectAnswer(answer)}
                  className={`w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isSelected
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{decodeHtml(answer)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={nextQuestion}
              disabled={selectedAnswer === undefined}
              className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Quiz;