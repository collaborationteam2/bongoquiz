const baseUrl = 'https://opentdb.com/api.php';

async function fetchQuizData(amount = 10, category = '', difficulty = '', type = '') {
  const url = new URL(baseUrl);
  url.searchParams.append('amount', amount);
  if (category) url.searchParams.append('category', category);
  if (difficulty) url.searchParams.append('difficulty', difficulty);
  if (type) url.searchParams.append('type', type);

  const response = await fetch(url);
  return response.json();
}