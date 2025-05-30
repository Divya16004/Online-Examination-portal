import { useState } from "react";
import { signup } from "../api";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setMessage(`Signup successful! Role: ${res.data.role}`);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
};

export default Signup;
