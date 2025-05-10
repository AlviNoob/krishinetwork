import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:4000";

const Support = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/expert`);
        if (!res.ok) throw new Error("Failed to fetch experts");
        const data = await res.json();
        setExperts(data);
      } catch (err) {
        console.error("Error fetching experts:", err);
        setError("Could not load expert profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Expert Support</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton loaders
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded shadow animate-pulse">
              <div className="w-full h-40 bg-gray-200 mb-4 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))
        ) : experts.length > 0 ? (
          experts.map((exp) => (
            <div key={exp._id} className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow">
              <img
                loading="lazy"
                src={exp.photoUrl || "/default-avatar.png"}
                alt={exp.name}
                className="w-full h-40 object-contain bg-gray-100 border mb-3 rounded"
              />
              <h2 className="text-lg font-semibold">{exp.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Specialization:</strong> {exp.specialization}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {exp.phone}
              </p>
              <p className="text-sm mb-4 text-gray-600">
                <strong>Description:</strong>{" "}
                {exp.description || "No description provided"}
              </p>
              <Link to={`/dashboard/appointment/${exp._id}`}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
              <button>
                Appoint
              </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No experts available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Support;
