import React, { useEffect, useState } from "react";
import { FiEdit2, FiLogOut, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const ExpertDashboard = () => {
  const navigate = useNavigate();

  // Grab the normalized shape { id, name, role, ... }
  const stored = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const expertId = stored.id;

  const [expert, setExpert] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    description: "",
    password: "",   // optional
    photoFile: null // store File object, not Base64
  });
  const [photoPreview, setPhotoPreview] = useState(stored.photoUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  

  // Handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // When user picks a new photo
  const handleFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(f => ({ ...f, photoFile: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    // Build a multipart form only if there's a file; otherwise small JSON
    let res, updated;
    try {
      if (form.photoFile) {
        // use FormData to send file + text
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("specialization", form.specialization);
        fd.append("description", form.description);
        if (form.password.trim()) fd.append("password", form.password);
        fd.append("photo", form.photoFile);

        res = await fetch(`${API_BASE_URL}/expert/${expertId}`, {
          method: "PUT",
          body: fd
        });
      } else {
        // small JSON payload
        const payload = {
          name: form.name,
          specialization: form.specialization,
          description: form.description
        };
        if (form.password.trim()) payload.password = form.password;

        res = await fetch(`${API_BASE_URL}/expert/${expertId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Update failed");
      }

      updated = await res.json();
      setExpert(updated);
      setEditMode(false);
      setForm(f => ({ ...f, password: "", photoFile: null }));
      setPhotoPreview(updated.photoUrl);

      // Sync localStorage so next dashboard visits see the new name/photo
      const current = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...current, name: updated.name, photoUrl: updated.photoUrl })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // only clear what we set
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate("/login");
  };

  if (!expertId) return null;
  if (error && !expert) return <p className="p-8 text-red-600">{error}</p>;
  if (!expert) return <p className="p-8 text-center">Loading…</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-green-800">Expert Panel</h2>
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => setEditMode(false)}
            className={`block w-full text-left px-4 py-2 rounded ${
              !editMode ? "bg-green-200" : "hover:bg-gray-100"
            }`}
          >
            My Profile
          </button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Consultation Requests
          </button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            My Answers
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto text-red-600 hover:underline flex items-center space-x-1"
        >
          <FiLogOut /> <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Hello, {expert.name}</h1>
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            <FiEdit2 className="mr-2" /> Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 flex items-center space-x-6">
          <img
            src={photoPreview || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="space-y-1">
            <p><strong>Name:</strong> {expert.name}</p>
            <p><strong>Specialization:</strong> {expert.specialization}</p>
            <p><strong>About:</strong> {expert.description || "—"}</p>
          </div>
        </div>

        {/* Educational Content */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Educational Content</h2>

          <div className="space-y-4">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course._id} className="border p-4 rounded-md shadow-lg">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-700">{course.content}</p>
                  <p className="text-sm text-gray-500">Posted by {course.author} on {new Date(course.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No courses available yet.</p>
            )}
          </div>
        </section>

        {/* Consultation Requests */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Consultation Requests</h2>
          <div className="bg-white shadow rounded-lg overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Farmer</th>
                  <th className="px-4 py-3">Topic</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">John Doe</td>
                  <td className="px-4 py-3">Cow Nutrition</td>
                  <td className="px-4 py-3">2025-05-07</td>
                  <td className="px-4 py-3 text-green-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Edit Profile Panel */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
          <div className="w-96 bg-white h-full shadow-xl p-6 overflow-auto">
            <button
              onClick={() => setEditMode(false)}
              className="absolute top-4 left-4 text-gray-600 hover:text-black"
            >
              <FiChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Photo</label>
                <input type="file" accept="image/*" onChange={handleFile} />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Leave blank to keep current"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                onClick={handleSave}
                className="mt-4 w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDashboard;