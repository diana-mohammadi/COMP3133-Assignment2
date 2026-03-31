const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  dateOfJoining: { type: String, required: true },
  profilePicture: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);