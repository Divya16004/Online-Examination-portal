// import { useState } from "react";
// import { FaUser, FaCertificate, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
// import StudentProfile from "./StudentProfile";
// import Certificates from "./Certificates";
// import Tests from "./Test";
// import "./StudentDashboard.css";

// export default function UserDashboard() {
//   const [activeTab, setActiveTab] = useState("Profile");
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from local storage
//     alert("Logged out successfully!");
//     navigate("/"); // Redirect to login page
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Profile":
//         return <StudentProfile />;
//       case "Certificates":
//         return <Certificates />;
//       case "Tests":
//         return <Tests />;
//       default:
//         return <StudentProfile />;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2 className="st-title">User Dashboard</h2>
//         <nav>
//           <button onClick={() => setActiveTab("Profile")}><FaUser /> Profile</button>
//           <button onClick={() => setActiveTab("Certificates")}><FaCertificate /> Certificates</button>
//           <button onClick={() => setActiveTab("Tests")}><FaClipboardList /> Tests</button>
//           <button onClick={handleLogout} className="nav-button logout">
//             <FaSignOutAlt /> <span>Logout</span>
//           </button>
//         </nav>
//       </div>
//       <div className="main-content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { FaUser, FaCertificate, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import Certificates from "./Certificates";
import axios from "axios";
import "./StudentDashboard.css";
import StudentTestReportPage from './StudentTestReportPage';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "Tests" && tests.length === 0) {
      axios.get("http://localhost:5000/api/tests") // Fetch test papers from MongoDB
        .then((response) => {
          console.log("Tests data:", response.data); // Add this for debugging
          setTests(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tests:", error);
          console.error("Error response:", error.response);
        });
    }
  }, [activeTab,tests]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleTakeTest = (testId) => {
    console.log("Navigating to test:", testId); // Debugging line
    navigate(`/test/${testId}`); // Navigate to the test page
  };

  const renderTests = () => (
    <div className="main-content test-list-container" style={{maxWidth:"900px"}}>
      {tests.length > 0 ? (
        tests.map((test) => (
          <div key={test._id} className="test-card">
            <h3>{test.title}</h3>
            <p>{test.description}</p>
            <button onClick={() => handleTakeTest(test._id)}>Take Test</button>
          </div>
        ))
      ) : (
        <p>No tests available.</p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <StudentProfile />;
      case "Certificates":
        return <Certificates />;
      case "Tests":
        return renderTests();
        case "Report":
        return <StudentTestReportPage />;
      default:
        return <StudentProfile />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="st-title">User Dashboard</h2>
        <nav>
          <button onClick={() => setActiveTab("Profile")} className={activeTab === "Profile" ? "active" : ""}><FaUser /> Profile</button>
          <button onClick={() => setActiveTab("Certificates")} className={activeTab === "Certificates" ? "active" : ""}><FaCertificate /> Certificates</button>
          <button onClick={() => setActiveTab("Tests")} className={activeTab === "Tests" ? "active" : ""}><FaClipboardList /> Tests</button>
          <button onClick={() => setActiveTab("Report")} className={activeTab === "Report" ? "active" : ""}><FaClipboardList /> Report</button>
          <button onClick={handleLogout} className="nav-button logout">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </nav>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}
