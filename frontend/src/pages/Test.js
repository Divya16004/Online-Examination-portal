import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Test.css";


const Test = ({ testId }) => {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null); // Timer state
  const [isSubmitted, setIsSubmitted] = useState(false); // Prevent resubmission
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchTest = async () => {
  //     const { data } = await axios.get(http://localhost:5000/api/tests/${testId});
  //     setTest(data);
  //     setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
  //   };
  //   fetchTest();
  // }, [testId]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        console.log("Fetching test with ID:", testId);
        const { data } = await axios.get(`https://online-examination-portal-backend-8k3g.onrender.com/api/tests/${testId}`);
        console.log("Fetched Test Data:", data); // Debugging output
        setTest(data);
        setTimeLeft(data.timeLimit * 60 || 600); // Default to 10 min if undefined
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };
  
    if (testId) fetchTest(); // Only fetch if testId exists
  }, [testId]);
  

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0&&!isSubmitted) {
      alert("⏰ Time's up! Auto-submitting the test.");
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timeLeft, isSubmitted]);

  

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions
    setIsSubmitted(true);

    try {
      const { data } = await axios.post(`https://online-examination-portal-backend-8k3g.onrender.com/api/tests/submit/${testId}`, { answers });
      alert(`✅ Test submitted!\nYour Score: ${data.score} out of ${data.totalMarks}`);

      navigate("/student");
    } catch (error) {
      alert("❌ Error submitting test.");
      setIsSubmitted(false); // Let user try again
    }
  };
  

  return test ? (
    <div className="test-container">
      <h2>{test.title}</h2>
      <h3>⏳ Time Left: {formatTime(timeLeft)}</h3> {/* Display Timer */}
      
      {test.sections.map((section) => (
        <div key={section._id}>
          <h3>{section.title}</h3>
          {section.questions.map((question) => (
            <div key={question._id}>
              <p>{question.questionText}</p>
              {question.options.map((option, index) => (
                <label key={index} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    onChange={() => handleChange(question._id, option)}
                    disabled={isSubmitted} // Disable inputs after submission
                    checked={answers[question._id] === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} disabled={isSubmitted}>Submit Test</button> {/* Disable after submission */}
    </div>
  ) : (
    <p>Loading test...</p>
  );
};

export default Test;