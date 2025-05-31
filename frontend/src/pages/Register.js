vimport { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Validate form before submission
   const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post("https://online-examination-portal-e9br.onrender.com/api/auth/register", formData);
      alert("Registered successfully");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response.data.message||"Registration failed");
    }
  };

  return (
    <div className="register-container">
    <form onSubmit={handleSubmit}>
    <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      {errors.name && <p className="error-message">{errors.name}</p>}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      {errors.email && <p className="error-message">{errors.email}</p>}
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      {errors.password && <p className="error-message">{errors.password}</p>}
      <button type="submit">Register</button>
      <p className="login-link">
          Already have an account? <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        </p>
    </form>
    </div>
  );
};

export default Register;
