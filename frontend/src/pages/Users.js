// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Users.css";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found in localStorage");
//         return;
//       }
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/admin/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="users-container">
//       <h2>All Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Date of Birth</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name || "N/A"}</td>
//                 <td>{user.email || "N/A"}</td>
//                 <td>{user.dob ? new Date(user.dob).toISOString().slice(0, 10) : "N/A"}</td>
//                 <td>{user.phone || "N/A"}</td>
//                 <td>{user.address || "N/A"}</td>
//                 <td>{user.gender || "N/A"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;

import React, { useState, useEffect } from "react";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating dummy data without backend
    const dummyUsers = [
      {
        _id: "1",
        name: "Riya Sharma",
        email: "riya@example.com",
        dob: "2001-03-15",
        phone: "9876543210",
        address: "Delhi, India",
        gender: "Female",
      },
      {
        _id: "2",
        name: "Arjun Mehta",
        email: "arjun@example.com",
        dob: "1999-12-01",
        phone: "9123456780",
        address: "Mumbai, India",
        gender: "Male",
      },
      {
        _id: "3",
        name: "Sneha Rao",
        email: "sneha@example.com",
        dob: "2000-08-25",
        phone: "9988776655",
        address: "Bangalore, India",
        gender: "Female",
      },
    ];

    setUsers(dummyUsers);
  }, []);

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.dob ? new Date(user.dob).toISOString().slice(0, 10) : "N/A"}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.address || "N/A"}</td>
                <td>{user.gender || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

