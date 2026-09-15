const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeCode: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Email không đúng định dạng'] 
  },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date },
  address: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  salary: { type: Number, min: [0, 'Lương phải lớn hơn hoặc bằng 0'], default: 0 },
  startDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['probation', 'active', 'inactive', 'resigned'], default: 'probation' },
  avatarUrl: { type: String, default: '' },
  note: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);