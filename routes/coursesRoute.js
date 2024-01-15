const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Course = require("../models/courseModel");

// add-bus

router.post("/add-course", authMiddleware, async (req, res) => {
  try {
    const existingCourse = await Course.findOne({ courseCode: req.body.courseCode });
    if (existingCourse) {
      return res.status(200).send({
        success: false,
        message: "Course already exists",
      });
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    return res.status(200).send({
      success: true,
      message: "Course added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-bus

router.post("/update-course", authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete-bus

router.post("/delete-course", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-all-buses

router.post("/get-all-courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-bus-by-id

router.post("/get-course-by-id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Bus fetched successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;