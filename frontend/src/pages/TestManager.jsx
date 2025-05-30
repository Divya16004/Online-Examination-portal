// TestManager.jsx
import { useState } from "react";
import AddTest from "./AddTest"; // Use your existing component

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [editTest, setEditTest] = useState(null);

  const handleTestSubmit = (newTest) => {
    if (editTest) {
      setTests((prevTests) =>
        prevTests.map((test) => (test.id === editTest.id ? newTest : test))
      );
      setEditTest(null);
    } else {
      setTests([...tests, { ...newTest, id: Date.now() }]);
    }
  };

  return (
    <div>
      <AddTest onSubmit={handleTestSubmit} editTest={editTest} />
      <div className="test-cards">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <h4>{test.title}</h4>
            <button onClick={() => setEditTest(test)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestManager;
