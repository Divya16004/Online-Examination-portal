// import React, { useEffect, useState } from 'react';
// import './MonitorProgress.css';

// const MonitorProgress = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     // Simulated fetch (replace with actual API call)
//     const fetchData = async () => {
//       // Example data
//       const data = [
//         { id: 1, name: 'Alice', status: 'In Progress', progress: 65 },
//         { id: 2, name: 'Bob', status: 'Completed', progress: 100 },
//         { id: 3, name: 'Charlie', status: 'Not Started', progress: 0 },
//         { id: 4, name: 'David', status: 'In Progress', progress: 40 },
//       ];
//       setStudents(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="monitor-container">
//       <h2>Monitor Test Progress</h2>
//       <table className="progress-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Student Name</th>
//             <th>Status</th>
//             <th>Progress</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, index) => (
//             <tr key={student.id}>
//               <td>{index + 1}</td>
//               <td>{student.name}</td>
//               <td>{student.status}</td>
//               <td>
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{
//                       width: `${student.progress}%`,
//                       backgroundColor:
//                         student.status === 'Completed'
//                           ? '#4caf50'
//                           : student.status === 'In Progress'
//                           ? '#ffc107'
//                           : '#ccc',
//                     }}
//                   >
//                     {student.progress}%
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MonitorProgress;

import React, { useEffect, useState } from 'react';
import './MonitorProgress.css';

const MonitorProgress = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, name: 'Alice', status: 'In Progress', progress: 65 },
        { id: 2, name: 'Bob', status: 'Completed', progress: 100 },
        { id: 3, name: 'Charlie', status: 'Not Started', progress: 0 },
        { id: 4, name: 'David', status: 'In Progress', progress: 40 },
        { id: 5, name: 'Emma', status: 'Completed', progress: 100 },
        { id: 6, name: 'Farhan', status: 'In Progress', progress: 70 },
        { id: 7, name: 'Geeta', status: 'Not Started', progress: 0 },
        { id: 8, name: 'Hari', status: 'In Progress', progress: 55 },
        { id: 9, name: 'Iqra', status: 'Completed', progress: 100 },
        { id: 10, name: 'Jay', status: 'In Progress', progress: 25 },
      ];
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="monitor-container">
      <h2>Monitor Test Progress</h2>
      <table className="progress-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.status}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${student.progress}%`,
                      backgroundColor:
                        student.status === 'Completed'
                          ? '#4caf50'
                          : student.status === 'In Progress'
                          ? '#ffc107'
                          : '#ccc',
                    }}
                  >
                    {student.progress}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitorProgress;

