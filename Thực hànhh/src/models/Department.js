const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name không được rỗng'] },
  code: { type: String, required: [true, 'code không được rỗng'], unique: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);