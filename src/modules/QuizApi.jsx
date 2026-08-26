const baseUrl = "https://the-trivia-api.com/api/questions";

async function fetchQuizData(
  amount = 10,
  category = "",
  difficulty = ""
) {
  const url = new URL(baseUrl);

  url.searchParams.set("limit", amount);

  if (category) {
    url.searchParams.set("categories", category);
  }

  if (difficulty) {
    url.searchParams.set("difficulties", difficulty);
  }

  console.log("Fetching quiz from:", url.toString());

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Quiz data received:", data);

    return transformQuestions(data);
  } catch (error) {
    console.error("Quiz API Error:", error);
    throw error;
  }
}

function transformQuestions(questions) {
  return questions.map((question, index) => {
    const correctAnswer = question.correctAnswer;

    const incorrectAnswers = question.incorrectAnswers || [];

    return {
      id: index,
      category: question.category,
      difficulty: question.difficulty,
      question: question.question,
      correctAnswer: correctAnswer,
      answers: shuffle([
        correctAnswer,
        ...incorrectAnswers,
      ]),
    };
  });
}

function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

export {
  fetchQuizData,
  transformQuestions,
  shuffle,
};