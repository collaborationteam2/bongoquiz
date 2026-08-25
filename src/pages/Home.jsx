import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to BongoQuiz
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Test your knowledge, challenge yourself, and have fun with quizzes
          built for curious minds.
        </p>
        <Link
          to="/quiz"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Quiz
        </Link>
      </section>

      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Fast & Fun</h3>
            <p className="text-sm text-gray-500">
              Quick quizzes designed to keep you engaged.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-gray-500">
              See how well you're doing as you go.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Learn Something New</h3>
            <p className="text-sm text-gray-500">
              Questions crafted to teach as much as they test.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2"></div>
            <p className="text-sm text-gray-500">Pick a quiz topic</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2"></div>
            <p className="text-sm text-gray-500">Answer the questions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2"></div>
            <p className="text-sm text-gray-500">See your results</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-blue-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to test yourself?</h2>
        <Link
          to="/quiz"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Start Quiz Now
        </Link>
      </section>
    </div>
  );
};

export default Home;