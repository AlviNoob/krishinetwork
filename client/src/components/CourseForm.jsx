import React, { useState } from 'react';

const CourseForm = ({ onPost }) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!user || user.role !== 'expert') {
      setError('Only experts can post educational content.');
      return;
    }

    if (!title || !content) {
      setError('All fields are required.');
      return;
    }

    const res = await fetch('http://localhost:4000/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author: user.name, role: user.role }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setError('');
      onPost();
    } else {
      setError('Failed to post course.');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Post Educational Content</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
        rows="5"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Course
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CourseForm;
