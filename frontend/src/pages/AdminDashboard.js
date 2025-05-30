import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaChartBar, FaUsers, FaSignOutAlt, FaEnvelope, FaPlusCircle} from "react-icons/fa";
import "./AdminDashboard.css";
import Profile from "./Profile";
import Statistics from "./Statistics";
import Users from "./Users";
import Contact from "./Contact";
import AddTest from "./AddTest"; // Import AddTest component
import TestManager from "./TestManager";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("AddTest");
  const [tests, setTests] = useState([]); // Store created tests
  const [editTest, setEditTest] = useState(null); // Store test for editing
  const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle sidebar state
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully!");
    navigate("/"); // Redirect to login page
  };

  const handleTestSubmit = (newTest) => {
    if (editTest) {
      // Update existing test
      setTests((prevTests) =>
        prevTests.map((test) => (test.id === editTest.id ? newTest : test))
      );
      setEditTest(null);
    } else {
      // Create new test
      setTests([...tests, { ...newTest, id: Date.now() }]);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Statistics":
        return <Statistics />;
      case "Users":
        return <Users />;
      case "Contact":
        return <Contact />;
      case "AddTest":
        // return <AddTest onSubmit={handleTestSubmit} editTest={editTest}/>; // Render the Add Test form
        return <TestManager />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰ Menu</button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <nav className="nav-menu">
          {/* <button onClick={() => setActiveTab("Profile")} className={`nav-button ${activeTab === "Profile" ? "active" : ""}`}>
            <FaUser /> <span>Profile</span>
          </button> */}
          <button onClick={() => setActiveTab("Statistics")} className={`nav-button ${activeTab === "Statistics" ? "active" : ""}`}>
            <FaChartBar /> <span>Statistics</span>
          </button>
          <button onClick={() => setActiveTab("Users")} className={`nav-button ${activeTab === "Users" ? "active" : ""}`}>
            <FaUsers /> <span>Users</span>
          </button>
          <button onClick={() => setActiveTab("Contact")} className={`nav-button ${activeTab === "Contact" ? "active" : ""}`}>
            <FaEnvelope /> <span>Contact</span>
          </button>
          <button onClick={() => setActiveTab("AddTest")} className={`nav-button ${activeTab === "AddTest" ? "active" : ""}`}>
            <FaPlusCircle /> <span>Add Test</span>
          </button>
          <button onClick={handleLogout} className="nav-button logout">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
         {/* Test Cards Container */}
         {activeTab === "AddTest" && (
          <div className="test-cards-container">
            {/* <h3>Created Tests</h3> */}
            <div className="test-cards">
              {tests.map((test) => (
                <div key={test.id} className="test-card">
                  <h4>{test.title}</h4>
                  <button onClick={() => setEditTest(test)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
