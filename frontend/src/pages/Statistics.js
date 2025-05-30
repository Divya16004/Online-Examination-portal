import { useEffect, useState } from "react";
import {
  Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";
import "./Statistics.css";

const Statistics = () => {
  const [data, setData] = useState(null);
  const colors = ["#4CAF50", "#FF4D4D"]; // Green for pass, red for fail

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👇 MOCK DATA used instead of real API call
        const mock = {
          total: 10,
          pass: 5,
          fail: 5,
          topStudents: [
            { rank: 1, name: "Alice", score: 98 },
            { rank: 2, name: "Bob", score: 95 },
            { rank: 3, name: "Charlie", score: 93 },
            { rank: 4, name: "David", score: 90 },
            { rank: 5, name: "Eva", score: 88 }
          ]
        };
        setData(mock);
      } catch (err) {
        console.error("Error fetching admin stats", err.message);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading statistics...</p>;

  const { total, pass, fail, topStudents } = data;

  return (
    <div className="statistics-container">
      <h1>📊 Student Exam Statistics</h1>

      <div className="stats-summary">
        <div className="stats-box"><h3>Total Students Appeared</h3><p>{total}</p></div>
        <div className="stats-box"><h3>✅ Pass</h3><p>{pass}</p></div>
        <div className="stats-box"><h3>❌ Fail</h3><p>{fail}</p></div>
      </div>

      <PieChart width={300} height={300}>
        <Pie
          data={[
            { name: "Pass", value: pass },
            { name: "Fail", value: fail }
          ]}
          dataKey="value"
          outerRadius={100}
          label
        >
          {colors.map((color, index) => (
            <Cell key={index} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <div className="top-students">
        <h3>🏅 Top 5 Students</h3>
        <ul>
          {topStudents.map((student) => (
            <li key={student.rank}>
              {student.rank}. {student.name} - {student.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
