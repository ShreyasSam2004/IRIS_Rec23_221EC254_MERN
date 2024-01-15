const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: Number,
    required: true,
    unique: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
