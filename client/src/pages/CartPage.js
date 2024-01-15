import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      // Extract course titles from the cart
      const courses = cart.map((course) => course.courseTitle);

      // Send a request to your backend to create/update the registration
      const response = await axios.post("/api/registrations/register", {
        courses,
        name: user.name,
        department: user.department,
        studentID: user.studentID,
      });

      if (response.data.success) {
        // Clear the cart after successful registration
        dispatch(clearCart());
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "50px" }}>Your Cart</h1>
      <p
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "15px",
          marginTop: "15px",
        }}
      >
        <span style={{ display: "block", marginBottom: "10px" }}>
          Student_Name: {user.name}
        </span>
        <span style={{ display: "block", marginBottom: "10px" }}>
          Student_ID: {user.studentID}
        </span>
        <span style={{ display: "block" }}>Student_Department: {user.department}</span>
      </p>

      <ul style={{ marginTop: "20px" }}>
        {cart.map((course) => (
          <li key={course._id}>
            {course.courseTitle} {course.courseCode} - {course.instructor}
          </li>
        ))}
      </ul>

      <button
        onClick={handleRegister}
        style={{
          padding: "10px",
          marginLeft: "7px",
          backgroundColor: "transparent",
          border: "1px solid #007bff",
          color: "#007bff",
          cursor: "pointer",
          transition: "transform 0.3s, color 0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "#0056b3";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "#007bff";
        }}
      >
        Register
      </button>
    </div>
  );
}

export default CartPage;
