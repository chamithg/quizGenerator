import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setup-form">
          <h2>Setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount"> number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category"> Select category</label>
            <select
              type="text"
              name="category"
              id="category"
              value={quiz.category}
              onChange={handleChange}
              className="form-input">
              <option value="sprots">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty"> Select difficulty</label>
            <select
              type="text"
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              onChange={handleChange}
              className="form-input">
              <option value="easy">easy</option>medium
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            Start quiz
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
