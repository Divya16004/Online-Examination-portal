import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Both fields are required!");
      return;
    }
    try {
      const { data } = await axios.post(
        "https://online-examination-portal-e9br.onrender.com/api/auth/login",
        formData
      );
      
      localStorage.setItem("token", data.token);
     
      localStorage.setItem("studentId", data.user._id);



      alert("Login successful");

      // Redirect to student dashboard
      navigate("/student");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
    <h2>Login</h2>

    {error && <p className="error-message">{error}</p>}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit" className="login-btn">Login</button>
      <p className="register-text">Not registered? 
          <button onClick={() => navigate("/register")} className="register-btn">Register</button>
        </p>
    </form>
    </div>
  );
};

export default Login;
