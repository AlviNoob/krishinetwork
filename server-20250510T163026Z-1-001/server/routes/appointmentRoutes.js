const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAppointmentsByUserId,
  getAppointmentsByExpertId,
} = require('../controllers/appointmentController');

router.post('/book-appointment', bookAppointment);
router.get('/get-appointments-by-user-id', getAppointmentsByUserId);
router.get('/get-appointments-by-expert-id', getAppointmentsByExpertId);

module.exports = router;
