// import React from 'react';
// import { Container, Nav } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faClipboardList, faUsers, faCheckCircle, faChartBar,
//   faDatabase, faBell, faSignOutAlt
// } from '@fortawesome/free-solid-svg-icons';

// import { Link, Outlet,useNavigate } from 'react-router-dom';
// // import AddTest from "./AddTest";
// import './ExaminerDashboard.css';

// const ExaminerDashboard = () => {
//   const navigate = useNavigate(); // ✅ Initialize navigation

//   const handleLogout = () => {
//     alert('Logged out successfully'); // ✅ Show popup
//     navigate('/'); // ✅ Navigate to home page
//   };
   
//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <Nav className="flex-column">
         
//         <Nav.Link as={Link} to="/examiner/monitor-progress" className={({ isActive }) => isActive ? "active-tab" : ""}>
//   <FontAwesomeIcon icon={faUsers} /> Monitor Test Progress
// </Nav.Link>


//           <Nav.Link as={Link} to="evaluate-submissions"><FontAwesomeIcon icon={faCheckCircle} /> Evaluate / Grade Submissions</Nav.Link>
//           <Nav.Link as={Link} to="/examiner/view-analytics"><FontAwesomeIcon icon={faChartBar} /> View Test Analytics</Nav.Link>
//           <Nav.Link as={Link} to="question-bank"><FontAwesomeIcon icon={faDatabase} /> Question Bank</Nav.Link>
//           <Nav.Link as={Link} to="/examiner/notifications"><FontAwesomeIcon icon={faBell} /> Notifications</Nav.Link>
//           <Nav.Link onClick={handleLogout}>
//             <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//           </Nav.Link>
//         </Nav>
//       </div> 

//       {/* Main Content */}
//       <div className="main-content">
//         <Container>
//           <Outlet /> {/* This will render the sub-pages  */}
//         </Container>
//         <h2>Welcome, Examiner!</h2>
//       <p>Select a task from the sidebar to get started.</p>
//       <p>You can monitor test progress, evaluate submissions, view analytics, and manage the question bank.</p>
//       </div>
//     </div>
//   );
// };

// export default ExaminerDashboard;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faUsers,
  faCheckCircle,
  faChartBar,
  // faDatabase,
  faBell,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ExaminerDashboard.css';

// Import your tab components here
import MonitorProgress from './MonitorProgress';
// import EvaluateSubmissions from './EvaluateSubmissions';
import ViewAnalytics from './ViewAnalytics';
import QuestionBank from './QuestionBank';
import Notifications from './Notifications';
import AddTest from './AddTest';


const ExaminerDashboard = () => {
  const [activeTab, setActiveTab] = useState('MonitorProgress');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'MonitorProgress':
        return <MonitorProgress />;
      // case 'EvaluateSubmissions':
        // return <EvaluateSubmissions />;
      case 'ViewAnalytics':
        return <ViewAnalytics />;
      case 'QuestionBank':
        return <QuestionBank />;
      case 'Notifications':
        return <Notifications />;
        case 'AddTest':
  return <AddTest />;
      default:
        return <MonitorProgress />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰ Menu
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 className="dashboard-title">Examiner Dashboard</h2>
        <nav className="nav-menu">
          <button
            onClick={() => setActiveTab('MonitorProgress')}
            className={`nav-button ${activeTab === 'MonitorProgress' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faUsers} /> <span>Monitor Test Progress</span>
          </button>
          {/* <button
            onClick={() => setActiveTab('EvaluateSubmissions')}
            className={`nav-button ${activeTab === 'EvaluateSubmissions' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faCheckCircle} /> <span>Evaluate Submissions</span>
          </button> */}
          <button
            onClick={() => setActiveTab('ViewAnalytics')}
            className={`nav-button ${activeTab === 'ViewAnalytics' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faChartBar} /> <span>View Analytics</span>
          </button>
          {/* <button
            onClick={() => setActiveTab('QuestionBank')}
            className={`nav-button ${activeTab === 'QuestionBank' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faDatabase} /> <span>Question Bank</span>
          </button> */}
          <button
            onClick={() => setActiveTab('Notifications')}
            className={`nav-button ${activeTab === 'Notifications' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faBell} /> <span>Notifications</span>
          </button>
          <button
  onClick={() => setActiveTab('AddTest')}
  className={`nav-button ${activeTab === 'AddTest' ? 'active' : ''}`}
>
  <FontAwesomeIcon icon={faCheckCircle} /> <span>Add Test</span>
</button>

          <button onClick={handleLogout} className="nav-button logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExaminerDashboard;
