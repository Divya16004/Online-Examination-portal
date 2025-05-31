
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddTest.css";

const AddTest = () => {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [timeLimit, setTimeLimit] = useState("");
  const [tests, setTests] = useState([]);
  const [editingTest, setEditingTest] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("https://online-examination-portal-backend-8k3g.onrender.com/api/tests");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const addSection = () => {
    setSections([...sections, { title: "", totalMarks: "", questions: [] }]);
  };

  const deleteSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addQuestion = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: "",
    });
    setSections(updatedSections);
  };

  const deleteQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

  const handleChange = (e, sectionIndex, questionIndex, field, optionIndex) => {
    const updatedSections = [...sections];
    if (questionIndex !== undefined) {
      if (optionIndex !== undefined) {
        updatedSections[sectionIndex].questions[questionIndex].options[optionIndex] = e.target.value;
      } else {
        updatedSections[sectionIndex].questions[questionIndex][field] = e.target.value;
      }
    } else {
      updatedSections[sectionIndex][field] = e.target.value;
    }
    setSections(updatedSections);
  };

  const handleEdit = (test) => {
    
    setTitle(test.title);
    setSections(test.sections);
    setTimeLimit(test.timeLimit);
    setEditingTest(test._id);
  };

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`https://online-examination-portal-backend-8k3g.onrender.com/api/tests/${testId}`);
      setTests(tests.filter((test) => test._id !== testId));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleSubmit = async () => {
    

    if (!title.trim() || !timeLimit) {
      alert("Test title and time limit are required!");
      return;
    }

    const totalMarks = sections.reduce((acc, section) => acc + Number(section.totalMarks || 0), 0);

    try {
      if (editingTest) {
        await axios.put(`https://online-examination-portal-backend-8k3g.onrender.com/api/tests/${editingTest}`, {
          title,
          totalMarks,
          timeLimit,
          sections,
        });
      } else {
        const response = await axios.post("https://online-examination-portal-backend-8k3g.onrender.com/api/tests", {
          title,
          totalMarks,
          timeLimit,
          sections,
        });
        setTests([...tests, response.data]);
      }

      alert(editingTest ? "Test updated successfully!" : "Test created successfully!");
      setTimeout(async () => {
    try {
      const response = await axios.get("https://online-examination-portal-backend-8k3g.onrender.com/api/tests");
      setTests(response.data);
    } catch (error) {
      console.error("Error refreshing tests:", error);
    }
  }, 100);

      setTitle("");
      setTimeLimit("");
      setSections([]);
      setEditingTest(null);
    } catch (error) {
      console.error("Error saving test:", error);
    }
  };

  return (
    <div id="top" className="add-test-container">
      <h2>{editingTest ? "Edit Test" : "Create Test"}</h2>
      <input
        type="text"
        placeholder="Test Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="test-input"
      />
      <input
        type="number"
        placeholder="Time Limit (minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        className="test-input"
      />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => handleChange(e, sectionIndex, undefined, "title")}
            className="test-input"
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={section.totalMarks}
            onChange={(e) => handleChange(e, sectionIndex, undefined, "totalMarks")}
            className="test-input"
          />
          <button onClick={() => deleteSection(sectionIndex)}>❌ Delete Section</button>

          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question">
              <input
                type="text"
                placeholder="Question"
                value={question.questionText}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex, "questionText")}
                className="test-input"
              />

              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleChange(e, sectionIndex, questionIndex, "options", optionIndex)}
                  className="test-input"
                />
              ))}

              <input
                type="text"
                placeholder="Correct Answer"
                value={question.correctAnswer}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex, "correctAnswer")}
                className="test-input"
              />

              <input
                type="number"
                placeholder="Marks"
                value={question.marks}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex, "marks")}
                className="test-input"
              />

              <button onClick={() => deleteQuestion(sectionIndex, questionIndex)}>❌ Delete Question</button>
            </div>
          ))}
          <button onClick={() => addQuestion(sectionIndex)}>➕ Add Question</button>
        </div>
      ))}

      <button onClick={addSection}>➕ Add Section</button>
      <button onClick={handleSubmit}>{editingTest ? "Update Test" : "✅ Create Test"}</button>

      <h2>Saved Tests</h2>
      <div className="test-list">
        {tests.map((test) => (
          <div key={test._id} className="test-card">
            <h3>{test.title}</h3>
            <p>Total Marks: {test.totalMarks}</p>
            <button onClick={() => { handleEdit(test); window.scrollTo(0, 0); }}>
              <a href='#top' style={{ textDecoration: "none", color: "white" }}>
              Edit</a>
            </button>

            <button onClick={() => handleDelete(test._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTest;
