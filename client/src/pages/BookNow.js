import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(course));
  };

  const [course, setCourse] = useState(null);
  const getCourse = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/courses/get-course-by-id",
        {
          _id: params.id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setCourse(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //   const bookNow = async (transactionId) => {
  //     try {
  //       dispatch(ShowLoading());
  //       const response = await axiosInstance.post("/api/bookings/book-seat", {
  //         bus: bus._id,
  //         seats: selectedSeats,
  //         transactionId,
  //       });
  //       dispatch(HideLoading());
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //         navigate("/bookings");
  //       } else {
  //         message.error(response.data.message);
  //       }
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };

  //   const onToken = async (token) => {
  //     try {
  //       dispatch(ShowLoading());
  //       const response = await axiosInstance.post("/api/bookings/make-payment", {
  //         token,
  //         amount: selectedSeats.length * bus.fare * 100,
  //       });
  //       dispatch(HideLoading());
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //         bookNow(response.data.data.transactionId);
  //       } else {
  //         message.error(response.data.message);
  //       }
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div>
      {course && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{course.name}</h1>
            <h1 className="text-md">Title : {course.courseTitle}</h1>
            <hr />

            <div className="flex flex-col gap-2">
              <p className="text-md">Deadline Date : {course.deadline}</p>
              <p className="text-md">Instructor : {course.instructor}</p>
              <p className="text-md">Credits : {course.credits}</p>
              <p className="text-md">Type : {course.type}</p>

              <p className="text-md">Code : {course.courseCode}</p>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              {/* <h1 className="text-2xl">
                Selected Seats : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl mt-2">
                Fare : {bus.fare * selectedSeats.length} /-
              </h1>
              <hr /> */}

              <button
                onClick={handleAddToCart}
                style={{
                  padding: "10px",
                  marginLeft : "7px",
                  backgroundColor: "transparent",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  cursor: "pointer",
                  transition: "transform 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.color = "#0056b3"; // Change to your desired hover color
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.color = "#007bff"; // Change back to the original color
                }}
              >
                Add to Cart
              </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}></Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
