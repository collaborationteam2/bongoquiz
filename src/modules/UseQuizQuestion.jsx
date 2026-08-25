import { useState, useEffect } from "react";
import { fetchQuizData } from "../modules/QuizApi";

function useQuizQuestion(amount, category, difficulty, type) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchQuizData(amount, category, difficulty, type);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [amount, category, difficulty, type]);

  return { questions, loading, error };
}