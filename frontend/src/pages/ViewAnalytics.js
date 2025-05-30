
//   // src/components/ViewTestAnalytics.jsx
// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const ViewTestAnalytics = () => {
//   // Dummy data (can be replaced with real API data)
//   const totalTests = 8;
//   const averageScore = 76;
//   const highestScore = 98;

//   const chartData = {
//     labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
//     datasets: [
//       {
//         label: 'Average Score (%)',
//         backgroundColor: '#28a745',
//         data: [72, 85, 68, 90, 77],
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       y: { beginAtZero: true, max: 100 },
//     },
//   };

//   return (
//     <Container className="mt-4">
//       <h3>Test Analytics</h3>
//       <Row className="mt-4">
//         <Col md={4}>
//           <Card bg="light" text="dark">
//             <Card.Body>
//               <Card.Title>Total Tests Conducted</Card.Title>
//               <Card.Text style={{ fontSize: '1.5rem' }}>{totalTests}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card bg="light" text="dark">
//             <Card.Body>
//               <Card.Title>Average Score</Card.Title>
//               <Card.Text style={{ fontSize: '1.5rem' }}>{averageScore}%</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card bg="light" text="dark">
//             <Card.Body>
//               <Card.Title>Highest Score</Card.Title>
//               <Card.Text style={{ fontSize: '1.5rem' }}>{highestScore}%</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="mt-5">
//         <Col>
//           <h5>Average Scores per Test</h5>
//           <Bar data={chartData} options={chartOptions} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ViewTestAnalytics;


// src/components/ViewTestAnalytics.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ViewTestAnalytics = () => {
  // Dummy data (replace with real API data)
  const totalTests = 8;
  const averageScore = 76;
  const highestScore = 98;

  const chartData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
    datasets: [
      {
        label: 'Average Score (%)',
        backgroundColor: '#28a745',
        data: [72, 85, 68, 90, 77],
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          font: { size: 13 },
        },
        grid: {
          color: '#e9ecef',
        },
      },
      x: {
        ticks: {
          font: { size: 13 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Test Analytics</h3>

      <Row className="g-4">
        {[ 
          { title: 'Total Tests Conducted', value: totalTests },
          { title: 'Average Score', value: `${averageScore}%` },
          { title: 'Highest Score', value: `${highestScore}%` }
        ].map(({ title, value }) => (
          <Col key={title} md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: '600', color: '#28a745' }}>
                  {value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <h5 className="mb-3 text-center">Average Scores per Test</h5>
          <Bar data={chartData} options={chartOptions} />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewTestAnalytics;
