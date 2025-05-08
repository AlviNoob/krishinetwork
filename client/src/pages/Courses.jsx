import React, { useEffect, useState } from 'react';
import CourseForm from '../components/CourseForm';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await fetch('http://localhost:4000/api/courses');
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <CourseForm onPost={fetchCourses} />
      <h2 className="text-2xl font-bold mt-6 mb-4">Educational Content</h2>
      {courses.map((course) => (
        <div key={course._id} className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p>{course.content}</p>
          <p className="text-sm text-gray-500">By {course.author} on {new Date(course.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
