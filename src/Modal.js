import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  const score = ((correct / questions.length) * 100).toFixed(0);
  return (
    <div className={`modal-container ${isModalOpen ? "isOpen" : null}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {correct} questions out of {questions.length}
        </p>
        <p> Your score is {score}%</p>
        <button className="close-btn" onClick={closeModal}>
          Start again
        </button>
      </div>
    </div>
  );
};

export default Modal;
