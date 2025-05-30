import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TestPage.css';

const TestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempted, setAttempted] = useState(new Set());
  const [answers, setAnswers] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds

  const blurHandlerRef = useRef();

  // // Fetch test data
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     localStorage.setItem('studentId', user._id);
  //   }

  //   axios.get(`http://localhost:5000/api/tests/${id}`)
  //     .then((response) => {
  //       console.log("Test Duration: ", response.data.duration); 
  //       setTest(response.data);
  //       setTimeLeft(response.data.duration * 60); // duration in minutes
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Error fetching test details");
  //       setLoading(false);
  //     });
  // }, [id]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    localStorage.setItem('studentId', user._id);
  }

  axios.get(`http://localhost:5000/api/tests/${id}`)
    .then((response) => {
      console.log("Test Duration: ", response.data.duration); 
      setTest(response.data);

      const duration = Number(response.data.duration);
      if (!isNaN(duration) && duration > 0) {
        setTimeLeft(duration * 60); // convert to seconds
      } else {
        console.error("Invalid duration received:", response.data.duration);
        setTimeLeft(10 * 60); // fallback to 10 minutes
      }

      setLoading(false);
    })
    .catch((err) => {
      setError("Error fetching test details");
      setLoading(false);
    });
}, [id]);


  




  // Timer countdown and auto submit
  useEffect(() => {
    if (!test || submitted) return;
  
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Time limit exceeded! Auto-submitting your test.");
          handleSubmit(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [test, submitted]);
  

  // Handle tab switching
  useEffect(() => {
    const handleBlur = () => {
      if (submitted) return;

      const newCount = tabSwitchCount + 1;
      setTabSwitchCount(newCount);

      if (newCount <= 2) {
        alert(`Warning! You switched tabs ${newCount} time(s)`);
      }

      if (newCount === 3) {
        alert('Tab switched 3 times. Test is being auto-submitted.');
        handleSubmit(true);
      }
    };

    blurHandlerRef.current = handleBlur;
    window.addEventListener('blur', blurHandlerRef.current);
    return () => window.removeEventListener('blur', blurHandlerRef.current);
  }, [tabSwitchCount, submitted]);

  // Handle answers
  const handleAttempt = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
    setAttempted((prev) => {
      const updated = new Set([...prev]);
      updated.add(questionId);
      return updated;
    });
  };

  // Submit (manual or auto)
  const handleSubmit = async (auto = false) => {
    if (submitted || !test) return;

    window.removeEventListener('blur', blurHandlerRef.current);

    const questions = test.sections.flatMap((section) => section.questions);
    let score = 0;

    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score += question.marks || 1;
      }
    });

    const total = questions.reduce((sum, q) => sum + (q.marks || 1), 0);

    try {
      const studentId = localStorage.getItem('studentId');
      await axios.post('http://localhost:5000/api/submissions', {
        testId: id,
        studentId,
        answers,
        score,
        total,
      });

      setSubmitted(true);

      if (!auto) {
        alert(`Test Submitted!\nYour Score: ${score} / ${total}`);
      }

      setTimeout(() => {
        navigate('/student');
      }, 1000);
    } catch (err) {
      alert("Error submitting test. Please try again.");
      console.error(err);
    }
  };
  console.log(timeLeft);  // Check the value of timeLeft before formatting

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <p>Loading test details...</p>;
  if (error) return <p>{error}</p>;

  const questions = test.sections.flatMap((section) => section.questions);
  const totalQuestions = questions.length;

  return (
    <div className="test-page">
      <div className="test-header">
        <h1>{test.title}</h1>
        <div className="summary">
          <span>Total Questions: {totalQuestions}</span>
          <span>Attempted: {attempted.size}</span>
          <span>Not Attempted: {totalQuestions - attempted.size}</span>
          <span className="timer">Time Left: {formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="questions">
        {questions.map((question, index) => (
          <div key={question._id} className="question">
            <div className="question-header">
              <span className="question-number">{index + 1}.</span>
              <span className="question-title">{question.questionText}</span>
            </div>
            <ul className="options">
              {question.options.map((option, i) => (
                <li key={i} style={{ display: 'inline-block', marginRight: '20px' }}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAttempt(question._id, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => handleSubmit(false)}>Submit</button>
      </div>
    </div>
  );
};

export default TestPage;
