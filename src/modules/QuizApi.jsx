const baseUrl = 'https://opentdb.com/api.php';

async function fetchQuizData(amount = 10, category = '', difficulty = '', type = '') {
  const url = new URL(baseUrl);
  url.searchParams.append('amount', amount);
  if (category) url.searchParams.append('category', category);
  if (difficulty) url.searchParams.append('difficulty', difficulty);
  if (type) url.searchParams.append('type', type);

   const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(getErrorMessage(data.response_code));
  }

  return transformQuestions(data.results);
}

function getErrorMessage(responseCode) {
  switch (responseCode) {
    case 1:
      return 'Invalid category ID';
    case 2:
      return 'Invalid difficulty level';
    case 3:
      return 'Invalid type';
    default:
      return 'Unknown error';
  }
}

function transformQuestions(questions) {
  return questions.map((question,index) => ({
   id: index,
    category: decodeHtml(question.category),
    difficulty: question.difficulty,
    question: decodeHtml(question.question),
    correctAnswer: decodeHtml(question.correct_answer),
    answers: shuffle([
      decodeHtml(question.correct_answer),
      ...question.incorrect_answers.map(decodeHtml),
    ]),
  }));
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}


export { fetchQuizData, getErrorMessage, transformQuestions };