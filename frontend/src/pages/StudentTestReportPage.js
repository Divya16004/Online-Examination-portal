import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentTestReportPage.css";

export default function StudentTestReportPage() {
  const [reports, setReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    const token = localStorage.getItem("token");

    if (!studentId || !token) {
      setError("Please login to view your reports.");
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `https://online-examination-portal-e9br.onrender.com/api/submissions/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const validReports = response.data.filter(
          (report) => report.score !== undefined
        );

        setReports(validReports);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const toggleExpand = (index) => {
    setExpandedReport(index === expandedReport ? null : index);
  };

  const downloadReport = (report) => {
    const fileName = `${report.testTitle.replace(/ /g, "_")}_report.txt`;
    const data = JSON.stringify(report, null, 2); // Convert report to formatted JSON

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="report-container">
      <h1>Your Test Reports</h1>
      {reports.length === 0 ? (
        <p>No test reports available.</p>
      ) : (
        reports.map((report, index) => (
          <div key={report._id} className="report-card">
            <div className="report-summary">
              {console.log(report)}
              <h2>{report.testTitle}</h2>
              <p style={{margin:"20px"}}>
                Score: {report.score} / {report.total}
              </p>
              <button onClick={() => toggleExpand(index)}>
                {expandedReport === index ? "Hide Details" : "View Details"}
              </button>
              <button onClick={() => downloadReport(report)}>
                Download Report
              </button>
            </div>

            {expandedReport === index && (
  <div className="report-details">
    {report.questions.map((question, idx) => {
      // Find the user's answer for this question
      const userAnswer = report.answers[0]?.[question._id];

      return (
        <div key={question._id} className="question-report">
          <p><strong>Q{idx + 1}:</strong> {question.questionText}</p>
          <p><strong>Your Answer:</strong> {userAnswer?.answerText || "Not answered"}</p>
          <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
          <p>
            <strong>Result:</strong> {userAnswer?.answerText === question.correctAnswer ? "✅ Correct" : "❌ Incorrect"}
          </p>
          <hr />
        </div>
      );
    })}
  </div>
)}

          </div>
        ))
      )}
    </div>
  );
}
