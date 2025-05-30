import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Certificates = () => {
  const certificates = [
    { id: 1, name: 'John Doe', course: 'Web Development', date: 'March 2025', file: 'certificate1.pdf' },
    { id: 2, name: 'Jane Smith', course: 'Data Science', date: 'April 2025', file: 'certificate2.pdf' }
  ];

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = `/certificates/${file}`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Certificates</h2>
      <div className="row">
        {certificates.map(cert => (
          <div key={cert.id} className="col-md-6">
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{cert.name}</h5>
                <p className="card-text"><strong>Course:</strong> {cert.course}</p>
                <p className="card-text"><strong>Date:</strong> {cert.date}</p>
                <button className="btn btn-primary" onClick={() => handleDownload(cert.file)}>Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;

