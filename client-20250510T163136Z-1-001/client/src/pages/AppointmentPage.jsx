import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentPage = ({ expertId, isExpert }) => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Get userId from localStorage
  const userId = localStorage.getItem('userId');

  // Fetch appointments for user or expert
  const fetchAppointments = async () => {
    try {
      const endpoint = isExpert
        ? `/api/appointments/get-appointments-by-expert-id?expertId=${expertId}`
        : `/api/appointments/get-appointments-by-user-id?userId=${userId}`;

      const response = await axios.get(endpoint);

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        alert('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('An error occurred while fetching appointments');
    }
  };

  // Book a new appointment
  const handleBooking = async () => {
    if (!date || !time) {
      alert('Please select both date and time');
      return;
    }

    try {
      const response = await axios.post('/api/appointments/book-appointment', {
        userId,
        expertId,
        date,
        time,
      });

      if (response.data.success) {
        alert('Appointment booked successfully');
        setDate('');
        setTime('');
        fetchAppointments(); // Refresh the list
      } else {
        alert(response.data.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred while booking the appointment');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [isExpert]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{isExpert ? 'Expert Appointments' : 'User Appointments'}</h2>

      {!isExpert && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Book Appointment</h3>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <br/><br />
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <br /><br />
          <button onClick={handleBooking}>Book Appointment</button>
        </div>
      )}

      <div>
        <h3>Appointment List</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                Date: {appointment.date}, Time: {appointment.time}, Status: {appointment.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
