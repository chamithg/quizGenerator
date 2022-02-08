import axios from "axios";
import React, { useState, useContext } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const tempUrl =
//   "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    console.log(response);
    if (response) {
      const data = response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setWaiting(true);
  };

  const checkAnswer = (answer, correct_answer) => {
    if (answer === correct_answer) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const categoryCode = () => {
    if (quiz.category === "sports") {
      return 21;
    }
    if (quiz.category === "history") {
      return 23;
    }
    if (quiz.category === "politics") {
      return 24;
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlNew = `${API_ENDPOINT}amount=${
      quiz.amount
    }&category=${categoryCode()}&difficulty=${quiz.difficulty}&type=multiple`;
    setIndex(0);

    fetchQuestions(urlNew);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
