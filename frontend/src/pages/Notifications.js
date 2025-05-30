import React from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';

const Notifications = () => {
  // Dummy notifications (can be dynamically fetched from backend)
  const notifications = [
    {
      id: 1,
      message: 'Reminder: Math test scheduled for 18th April at 10:00 AM.',
      time: '2 hours ago',
      type: 'reminder',
    },
    {
      id: 2,
      message: 'Test evaluation results for Science test are available now.',
      time: '1 day ago',
      type: 'result',
    },
   
  ];

  const getVariant = (type) => {
    switch (type) {
      case 'reminder':
        return 'info';
      case 'result':
        return 'success';
      case 'assignment':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-4">
      <h3>Notifications & Reminders</h3>
      <ListGroup className="mt-3">
        {notifications.map((note) => (
          <ListGroup.Item key={note.id}>
            <Badge bg={getVariant(note.type)} className="me-2">{note.type.toUpperCase()}</Badge>
            {note.message}
            <div className="text-muted small float-end">{note.time}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Notifications;
