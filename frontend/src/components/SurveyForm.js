import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyForm.css";
import AdditionalQuestions from "./AdditionalQuestions";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [additionalAnswers, setAdditionalAnswers] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [additionalSubmitted, setAdditionalSubmitted] = useState(false);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(
        `https://backend-217ni2tmx-bhawnas-projects-4cdd8807.vercel.app/questions?topic=${formData.surveyTopic}`
      );
      setAdditionalQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.surveyTopic)
      newErrors.surveyTopic = "Survey Topic is required";
    if (formData.surveyTopic === "Technology") {
      if (!formData.favoriteProgrammingLanguage)
        newErrors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      if (!formData.yearsOfExperience)
        newErrors.yearsOfExperience = "Years of Experience is required";
    }
    if (formData.surveyTopic === "Health") {
      if (!formData.exerciseFrequency)
        newErrors.exerciseFrequency = "Exercise Frequency is required";
      if (!formData.dietPreference)
        newErrors.dietPreference = "Diet Preference is required";
    }
    if (formData.surveyTopic === "Education") {
      if (!formData.highestQualification)
        newErrors.highestQualification = "Highest Qualification is required";
      if (!formData.fieldOfStudy)
        newErrors.fieldOfStudy = "Field of Study is required";
    }
    if (!formData.feedback) newErrors.feedback = "Feedback is required";
    else if (formData.feedback.length < 50)
      newErrors.feedback = "Feedback must be at least 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setFormSubmitted(true);
    }
  };

  const handleAdditionalSubmit = (answers) => {
    setAdditionalAnswers(answers);
    setAdditionalSubmitted(true);
  };

  return (
    <div>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="survey-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Survey Topic:</label>
            <select
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleChange}
            >
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && (
              <span className="error">{errors.surveyTopic}</span>
            )}
          </div>

          {formData.surveyTopic === "Technology" && (
            <div>
              <div className="form-group">
                <label>Favorite Programming Language:</label>
                <select
                  name="favoriteProgrammingLanguage"
                  value={formData.favoriteProgrammingLanguage}
                  onChange={handleChange}
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && (
                  <span className="error">
                    {errors.favoriteProgrammingLanguage}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Years of Experience:</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                {errors.yearsOfExperience && (
                  <span className="error">{errors.yearsOfExperience}</span>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === "Health" && (
            <div>
              <div className="form-group">
                <label>Exercise Frequency:</label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <span className="error">{errors.exerciseFrequency}</span>
                )}
              </div>
              <div className="form-group">
                <label>Diet Preference:</label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                >
                  <option value="">Select Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && (
                  <span className="error">{errors.dietPreference}</span>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === "Education" && (
            <div>
              <div className="form-group">
                <label>Highest Qualification:</label>
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && (
                  <span className="error">{errors.highestQualification}</span>
                )}
              </div>
              <div className="form-group">
                <label>Field of Study:</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                />
                {errors.fieldOfStudy && (
                  <span className="error">{errors.fieldOfStudy}</span>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
            {errors.feedback && (
              <span className="error">{errors.feedback}</span>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : !additionalSubmitted ? (
        <AdditionalQuestions
          additionalQuestions={additionalQuestions}
          onSubmit={handleAdditionalSubmit}
        />
      ) : (
        <div className="summary">
          <h3>Survey Summary</h3>
          <p>
            <strong>Full Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Survey Topic:</strong> {formData.surveyTopic}
          </p>
          {formData.surveyTopic === "Technology" && (
            <>
              <p>
                <strong>Favorite Programming Language:</strong>{" "}
                {formData.favoriteProgrammingLanguage}
              </p>
              <p>
                <strong>Years of Experience:</strong>{" "}
                {formData.yearsOfExperience}
              </p>
            </>
          )}
          {formData.surveyTopic === "Health" && (
            <>
              <p>
                <strong>Exercise Frequency:</strong>{" "}
                {formData.exerciseFrequency}
              </p>
              <p>
                <strong>Diet Preference:</strong> {formData.dietPreference}
              </p>
            </>
          )}
          {formData.surveyTopic === "Education" && (
            <>
              <p>
                <strong>Highest Qualification:</strong>{" "}
                {formData.highestQualification}
              </p>
              <p>
                <strong>Field of Study:</strong> {formData.fieldOfStudy}
              </p>
            </>
          )}
          <p>
            <strong>Feedback:</strong> {formData.feedback}
          </p>
          <h4>Additional Questions and Answers:</h4>
          <ul>
            {additionalQuestions.map((question) => (
              <li key={question.id}>
                <strong>{question.text}:</strong>{" "}
                {additionalAnswers[`question-${question.id}`]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
