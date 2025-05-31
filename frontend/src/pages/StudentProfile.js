import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentProfile.css";

const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    gender: "",
  });

  // Calculate age based on DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("https://online-examination-portal-e9br.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          dob: data.dob || "",
          phone: data.phone || "",
          address: data.address || "",
          gender: data.gender || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle update profile
  // const handleUpdate = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     await axios.put("http://localhost:5000/api/auth/profile", formData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
      
  //     setUser({ ...user, ...formData });
  //     setEdit(false);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found! User is not authenticated.");
      return;
    }
  
    try {
      console.log("Token being sent:", token); // Debugging output
      console.log("Sending data:", formData); // Debugging output
  
      const response = await axios.put(
        "https://online-examination-portal-e9br.onrender.com/api/auth/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
  
      console.log("Profile updated successfully:", response.data);
  
      setUser({ ...user, ...formData });
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      {edit ? (
        <div className="edit-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {user.dob ? user.dob.split("T")[0] : "N/A"}</p>

          <p><strong>Age:</strong> {calculateAge(user.dob)}</p>

          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>
          <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
          <button onClick={() => setEdit(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
