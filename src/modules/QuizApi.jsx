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

export { fetchQuizData };