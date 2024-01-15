const express = require("express");
const router = express.Router();
const Registration = require("../models/registrationModel");

// Import necessary modules and models

router.post("/register", async (req, res) => {
    const { courses, name, department, studentID } = req.body;
  
    try {
      // Check if a registration already exists for the studentID
      let registration = await Registration.findOne({ studentID });
  
      if (registration) {
        // Check if the user is already registered for any of the new courses
        const alreadyRegisteredCourses = courses.filter((course) => registration.courses.includes(course));
  
        if (alreadyRegisteredCourses.length > 0) {
          // User is trying to register for courses they are already registered for
          return res.status(400).json({
            success: false,
            message: "Already registered for some of the selected courses",
            alreadyRegisteredCourses,
          });
        }
  
        // Append new courses to the existing registration
        registration.courses = [...registration.courses, ...courses];
        await registration.save();
  
        return res.status(200).json({ success: true, message: "Registration updated successfully" });
      } else {
        // Create a new registration if it doesn't exist
        registration = new Registration({
          courses,
          name,
          department,
          studentID,
        });
        await registration.save();
  
        return res.status(201).json({ success: true, message: "Registration created successfully" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
module.exports = router;
