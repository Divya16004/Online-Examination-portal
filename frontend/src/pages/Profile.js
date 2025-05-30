// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Profile.css";

// const Profile = () => {
//     const [profile, setProfile] = useState(null);
//     const [editing, setEditing] = useState(false);
//     const [updatedProfile, setUpdatedProfile] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem("adminToken");
//                 const response = await axios.get('/api/admin/profile', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 const userData = response.data || {};
//                 setProfile(userData);
//                 setUpdatedProfile(userData);
//                 sessionStorage.setItem("adminEmail", userData.email);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//                 setErrorMessage("Failed to load profile.");
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => {
//         setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleCancel = () => {
//         setEditing(false);
//         setUpdatedProfile(profile);
//         setSelectedFile(null);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage("");
//         setSuccessMessage("");
    
//         try {
//             let updatedData = { ...updatedProfile };
    
//             // Upload profile picture if a file is selected
//             if (selectedFile) {
//                 const formData = new FormData();
//                 formData.append('profilePic', selectedFile);
    
//                 const uploadResponse = await axios.post('http://localhost:5000/api/admin/upload-profile-pic', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//                     }
//                 });
    
//                 updatedData.profilePic = uploadResponse.data.imageUrl;
//             }
            

//             // Send PUT request with token in headers
//             const token = sessionStorage.getItem("adminToken");
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
        

//             console.log("Token before update:", token);

    
//             const response = await axios.put('/api/admin/profile', updatedData, config);
//             setProfile(response.data || {});
//             setEditing(false);
//             setSuccessMessage("Profile updated successfully!");
//             setTimeout(() => setSuccessMessage(""), 3000);
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             if (error.response) {
//                 console.log("Response data:", error.response.data);
//                 console.log("Response status:", error.response.status);
//             }
//             setErrorMessage(error.response?.data?.message || "Failed to update profile.");
//         }
//     };
    

//     if (loading) return <div className="loading">Loading...</div>;

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Admin Profile</h2>
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//             <div className="card p-4 shadow">
//                 <div className="text-center">
//                     <img
//                         src={profile?.profilePic || "/default-profile.png"}
//                         alt="Profile"
//                         className="rounded-circle profile-img"
//                     />
//                 </div>

//                 {editing ? (
//                     <form onSubmit={handleSubmit} className="mt-3">
//                         <label>Profile Picture:</label>
//                         <input type="file" className="form-control mb-2" onChange={handleFileChange} />

//                         <label>Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             className="form-control mb-2"
//                             value={updatedProfile.name || ''}
//                             onChange={handleChange}
//                             required
//                         />

//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             className="form-control mb-2"
//                             value={updatedProfile.email || ''}
//                             disabled
//                         />

//                         <label>Phone:</label>
//                         <input
//                             type="text"
//                             name="phone"
//                             className={`form-control mb-2 ${!/^\d{10}$/.test(updatedProfile.phone || '') && updatedProfile.phone ? 'is-invalid' : ''}`}
//                             value={updatedProfile.phone || ''}
//                             onChange={handleChange}
//                             required
//                         />
//                         <div className="invalid-feedback">Phone number must be 10 digits</div>

//                         <label>Date of Birth:</label>
//                         <input
//                             type="date"
//                             name="dob"
//                             className="form-control mb-2"
//                             value={updatedProfile.dob || ''}
//                             onChange={handleChange}
//                             required
//                         />

//                         <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
//                         <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
//                     </form>
//                 ) : (
//                     <div className="mt-3">
//                         <p><strong>Name:</strong> {profile?.name || 'N/A'}</p>
//                         <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
//                         <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
//                         <p><strong>Date of Birth:</strong> {profile?.dob || 'N/A'}</p>
//                         <button className="btn btn-warning" onClick={() => setEditing(true)}>Edit Profile</button>
//                         <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("adminToken");  // Use adminToken consistently
                const response = await axios.get('/api/admin/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data || {};
                setProfile(userData);
                setUpdatedProfile(userData);
                sessionStorage.setItem("adminEmail", userData.email);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setErrorMessage("Failed to load profile.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        setEditing(false);
        setUpdatedProfile(profile);
        setSelectedFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
    
        try {
            let updatedData = { ...updatedProfile };
    
            // Upload profile picture if a file is selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append('profilePic', selectedFile);
    
                const uploadResponse = await axios.post('http://localhost:5000/api/admin/upload-profile-pic', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`  // Use adminToken
                    }
                });
    
                updatedData.profilePic = uploadResponse.data.imageUrl;
            }

            // Get the admin token and set the config
            const token = localStorage.getItem("adminToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            console.log("Token before update:", token);
    
            const response = await axios.put('http://localhost:5000/api/admin/profile', updatedData, config);
            setProfile(response.data || {});
            setEditing(false);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
            }
            setErrorMessage(error.response?.data?.message || "Failed to update profile.");
        }
    };
    

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Admin Profile</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <div className="card p-4 shadow">
                <div className="text-center">
                    <img
                        src={profile?.profilePic || "/default-profile.png"}
                        alt="Profile"
                        className="rounded-circle profile-img"
                    />
                </div>

                {editing ? (
                    <form onSubmit={handleSubmit} className="mt-3">
                        <label>Profile Picture:</label>
                        <input type="file" className="form-control mb-2" onChange={handleFileChange} />

                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-2"
                            value={updatedProfile.name || ''}
                            onChange={handleChange}
                            required
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-2"
                            value={updatedProfile.email || ''}
                            disabled
                        />

                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            className={`form-control mb-2 ${!/^\d{10}$/.test(updatedProfile.phone || '') && updatedProfile.phone ? 'is-invalid' : ''}`}
                            value={updatedProfile.phone || ''}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Phone number must be 10 digits</div>

                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            className="form-control mb-2"
                            value={updatedProfile.dob || ''}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
                    </form>
                ) : (
                    <div className="mt-3">
                        <p><strong>Name:</strong> {profile?.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> {profile?.dob || 'N/A'}</p>
                        <button className="btn btn-warning" onClick={() => setEditing(true)}>Edit Profile</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

