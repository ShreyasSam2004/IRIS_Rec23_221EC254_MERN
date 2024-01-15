import React from "react";
import { useNavigate } from "react-router-dom";

function Course({ course }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg primary-text">{course.courseTitle}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">Instructor</p>
          <p className="text-sm">{course.instructor}</p>
        </div>

        <div>
          <p className="text-sm">Credits</p>
          <p className="text-sm">{course.credits}</p>
        </div>

        <div>
          <p className="text-sm">Type</p>
          <p className="text-sm">{course.type}</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm">Deadline Date</p>
          <p className="text-sm">{course.deadline}</p>
        </div>

        <h1 className="text-lg underline secondary-text" onClick={()=>{
            navigate(`/book-now/${course._id}`)
        }}>Choose</h1>
      </div>
    </div>
  );
}

export default Course;