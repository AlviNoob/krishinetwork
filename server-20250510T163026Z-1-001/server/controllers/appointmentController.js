const Appointment = require('../models/appointmentModel');

// Book Appointment (no auth)
const bookAppointment = async (req, res) => {
  try {
    const { userId, expertId, date, time } = req.body;

    if (!userId || !expertId || !date || !time) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check for existing slot
    const alreadyBooked = await Appointment.findOne({ expertId, date, time });
    if (alreadyBooked) {
      return res.status(409).json({ success: false, message: 'Slot already booked' });
    }

    const appointment = new Appointment({
      userId,
      expertId,
      date,
      time,
    });

    await appointment.save();
    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get appointments by user ID
const getAppointmentsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

    const appointments = await Appointment.find({ userId });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get appointments by expert ID
const getAppointmentsByExpertId = async (req, res) => {
  try {
    const expertId = req.query.expertId;
    if (!expertId) return res.status(400).json({ success: false, message: 'expertId is required' });

    const appointments = await Appointment.find({ expertId });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  bookAppointment,
  getAppointmentsByUserId,
  getAppointmentsByExpertId,
};
