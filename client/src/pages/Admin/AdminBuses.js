import { message, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CourseForm from "../../components/CourseForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminBuses() {
  const dispatch = useDispatch();
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const getCourses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/courses/get-all-courses", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setCourses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteCourse = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/courses/delete-course", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getCourses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "courseTitle",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },
    {
      title: "Deadline Date",
      dataIndex: "deadline",
    },
    {
      title: "S/NS",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteCourse(record._id);
            }}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedCourse(record);
              setShowCourseForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Courses" />
        <button className="primary-btn" onClick={() => setShowCourseForm(true)}>
          Add Course
        </button>
      </div>

      <Table columns={columns} dataSource={courses} />

      {showCourseForm && (
        <CourseForm
          showCourseForm={showCourseForm}
          setShowCourseForm={setShowCourseForm}
          type={selectedCourse ? "edit" : "add"}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          getData={getCourses}
        />
      )}
    </div>
  );
}

export default AdminBuses;