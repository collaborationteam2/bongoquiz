import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/home">BongoQuiz</Link>
      </div>

      <div>
        <Link to="/home">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;