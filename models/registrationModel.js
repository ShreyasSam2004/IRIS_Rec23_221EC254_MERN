const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  courses: {
    type: [{ type: String }],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
