
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; // Update to use Routes instead of Switch
// import Signup from './components/Signup';
// import Signin from './components/Signin';
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CustomCardApp from './pages/CustomCards';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import ExaminerRegister from './pages/ExaminerRegister';
import ExaminerLogin from './pages/ExaminerLogin';
import TestPage from "./pages/TestPage";
import StudentTestReportPage from './pages/StudentTestReportPage';


import MonitorProgress from './pages/MonitorProgress';
import EvaluateSubmissions from './pages/EvaluateSubmissions';
import ViewAnalytics from './pages/ViewAnalytics';
import QuestionBank from './pages/QuestionBank';
import Notifications from './pages/Notifications';




function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<CustomCardApp />} />
      {/* <Route path="/login" element={<} /> Redirect to login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/examinerregister" element={<ExaminerRegister />} />
        <Route path="/examinerlogin" element={<ExaminerLogin />} />

        {/* Protected Routes for Dashboards */}
        {/* <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
        <Route path="/examiner" element={<ProtectedRoute element={<ExaminerDashboard />} allowedRoles={["examiner"]} />} /> */}
        <Route path="/student" element={<ProtectedRoute element={<StudentDashboard />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/examiner" element={<ProtectedRoute element={<ExaminerDashboard />} />} />

        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/student/reports" element={<StudentTestReportPage />} />

       
          <Route path="/examiner/monitor-progress" element={<MonitorProgress />} />
          <Route path="/examiner/evaluatesubmissions" element={<EvaluateSubmissions />} />
          <Route path="/examiner/view-analytics" element={<ViewAnalytics />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route path="/examiner/notifications" element={<Notifications />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
