import React, { useState } from "react";

const AdditionalQuestions = ({ additionalQuestions, onSubmit }) => {
  const [additionalAnswers, setAdditionalAnswers] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalAnswers({
      ...additionalAnswers,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(additionalAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="additional-questions">
      <h3>Additional Questions</h3>
      {additionalQuestions.length > 0 ? (
        additionalQuestions.map((question) => (
          <div key={question.id} className="form-group">
            <label>{question.text}</label>
            <input
              type="text"
              name={`question-${question.id}`}
              onChange={handleChange}
            />
          </div>
        ))
      ) : (
        <p>No additional questions available.</p>
      )}
      {additionalQuestions.length > 0 && (
        <button type="submit">Submit Additional Questions</button>
      )}
    </form>
  );
};

export default AdditionalQuestions;
