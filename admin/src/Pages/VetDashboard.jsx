import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const VetDashboard = () => {
  const { user, userData } = useAuth();

  // Sample vet profile data
  const vetProfile = {
    name: userData?.name || "Loading...",
    specialty: userData?.specialty || "Small Animals",
    email: user?.email || "Loading...",
    phone: userData?.phone || "Not provided",
    clinic: userData?.clinic || "Not provided",
  };

  // State for treatments/medicines and appointments fetched from backend
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: "Deworming",
      dosage: "1 tablet",
      instructions: "Give once every 3 months",
    },
    {
      id: 2,
      name: "Rabies Vaccine",
      dosage: "1 dose",
      instructions: "Annual vaccination",
    },
  ]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [error, setError] = useState(null);

  // Form state for new treatment
  const [treatmentName, setTreatmentName] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");

  // Form state for new appointment
  const [appointmentType, setAppointmentType] = useState("Clinic Visit");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch appointments and payments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!userData?.id) {
          console.log(
            "No vet ID available yet. Current userData:",
            userData
          );
          return;
        }

        console.log("Fetching appointments for vet:", userData.id);
        const res = await axios.get(
          `${API_URL}/api/appointments/vet/${userData.id}`
        );
        if (res.data.success) {
          console.log("Fetched appointments:", res.data.appointments);
          setAppointments(res.data.appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments");
      }
    };

    const fetchPayments = async () => {
      try {
        if (!userData?.id) {
          console.log(
            "No vet ID available yet. Current userData:",
            userData
          );
          return;
        }

        console.log("Fetching payments for vet:", userData.id);
        const res = await axios.get(
          `${API_URL}/api/appointments/payments/${userData.id}`
        );
        if (res.data.success) {
          console.log("Fetched payments:", res.data.payments);
          setPayments(res.data.payments);
          setTotalPayments(res.data.totalAmount);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("Failed to fetch payments");
      }
    };

    if (user && userData?.type === "vet") {
      fetchAppointments();
      fetchPayments();
    }
  }, [user, userData, API_URL]);

  // Handlers for adding treatment and appointment (local only)
  const handleAddTreatment = (e) => {
    e.preventDefault();
    if (!treatmentName || !dosage || !instructions) return;
    const newTreatment = {
      id: treatments.length + 1,
      name: treatmentName,
      dosage,
      instructions,
    };
    setTreatments([...treatments, newTreatment]);
    setTreatmentName("");
    setDosage("");
    setInstructions("");
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) return;
    const newAppointment = {
      id: appointments.length + 1,
      type: appointmentType,
      date: appointmentDate,
      time: appointmentTime,
      pet: {
        id: null,
        name: "New Pet",
        species: "Dog",
        owner: "Owner Name",
      }, // Placeholder pet
      status: "Pending",
    };
    setAppointments([...appointments, newAppointment]);
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentType("Clinic Visit");
  };

  // Handlers for accepting and rescheduling appointments
  const handleAcceptAppointment = async (id) => {
    try {
      await axios.put(`${API_URL}/api/appointments/accept/${id}`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "Accepted" } : appt
        )
      );
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleRescheduleAppointment = async (id, newDate, newTime) => {
    try {
      await axios.put(`${API_URL}/api/appointments/reschedule/${id}`, {
        date: newDate,
        time: newTime,
      });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id
            ? { ...appt, status: "Rescheduled", date: newDate, time: newTime }
            : appt
        )
      );
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Vet Dashboard</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Vet Profile Section */}
      <section className="mb-12 border p-4 rounded shadow-sm max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Vet Profile</h2>
        <p>
          <strong>Name:</strong> {vetProfile.name}
        </p>
        <p>
          <strong>Specialty:</strong> {vetProfile.specialty}
        </p>
        <p>
          <strong>Email:</strong> {vetProfile.email}
        </p>
        <p>
          <strong>Phone:</strong> {vetProfile.phone}
        </p>
        <p>
          <strong>Clinic:</strong> {vetProfile.clinic}
        </p>
      </section>

      {/* Treatment/Medicine Prescription Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Prescribe Treatment/Medicine</h2>
        <form onSubmit={handleAddTreatment} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Treatment/Medicine Name</label>
            <input
              type="text"
              value={treatmentName}
              onChange={(e) => setTreatmentName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Deworming"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Dosage</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. 1 tablet"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Give once every 3 months"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Treatment
          </button>
        </form>

        {/* Display prescribed treatments */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Prescribed Treatments/Medicines</h3>
          {treatments.length === 0 ? (
            <p>No treatments prescribed yet.</p>
          ) : (
            <ul className="space-y-2">
              {treatments.map((treat) => (
                <li key={treat.id} className="border p-3 rounded shadow-sm">
                  <p>
                    <strong>Name:</strong> {treat.name}
                  </p>
                  <p>
                    <strong>Dosage:</strong> {treat.dosage}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {treat.instructions}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Appointment Scheduling Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Schedule Appointment</h2>
        <form onSubmit={handleAddAppointment} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Appointment Type</label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Clinic Visit">Clinic Visit</option>
              <option value="Home Visit">Home Visit</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Schedule Appointment
          </button>
        </form>

        {/* Display scheduled appointments */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Scheduled Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments scheduled yet.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appt) => (
                <li
                  key={appt._id}
                  className="border p-4 rounded-lg shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-lg mb-1">
                        {appt.petId?.name || appt.pet?.name || "Pet"}
                      </p>
                      <p className="text-gray-600">
                        {appt.petId?.species || appt.pet?.species || "Species Unknown"}
                      </p>
                      <p className="text-gray-600">
                        Owner: {appt.petId?.owner || appt.pet?.owner || "No owner info"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : appt.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{appt.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium">${appt.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">
                        {new Date(appt.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">{appt.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {appt.status === "Pending" && (
                      <button
                        onClick={() => handleAcceptAppointment(appt._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const newDate = prompt(
                          "Enter new date (YYYY-MM-DD):",
                          new Date(appt.date).toISOString().split("T")[0]
                        );
                        const newTime = prompt(
                          "Enter new time (HH:MM):",
                          appt.time
                        );
                        if (newDate && newTime) {
                          handleRescheduleAppointment(
                            appt._id,
                            newDate,
                            newTime
                          );
                        }
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Reschedule
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Payment Tracking Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Payment Tracking</h2>
        <p>
          <strong>Total Payments Received:</strong> ${totalPayments}
        </p>
        {payments.length === 0 ? (
          <p>No payments received yet.</p>
        ) : (
          <ul className="space-y-2">
            {payments.map((payment) => (
              <li
                key={payment._id || payment.id}
                className="border p-3 rounded shadow-sm"
              >
                <p>
                  <strong>Appointment ID:</strong> {payment._id || payment.id}
                </p>
                <p>
                  <strong>Amount:</strong> ${payment.amount}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(payment.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default VetDashboard; 