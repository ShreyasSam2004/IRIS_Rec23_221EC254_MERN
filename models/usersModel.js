const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You may want to add additional validation for email format
  },
  department: {
    type: String,
    required: true,
  },
  programType: {
    type: String,
    required: true,
    // You might want to restrict the program type to specific values (e.g., undergraduate, postgraduate)
  },
  studentID: {
    type: String,
    required: true,
    unique: true,
    // You may want to add additional validation for the student ID format
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hostel: {
    type: String,

  },
  mess: {
    type: String,
    
  },


  password: {
    type: String,
    required: true,
    // You should hash the password before saving it to the database for security reasons
  },
});


module.exports = mongoose.model("users", userSchema);