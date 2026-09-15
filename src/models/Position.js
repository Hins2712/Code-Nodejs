const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name không được rỗng'] },
  code: { type: String, required: [true, 'code không được rỗng'], unique: true },
  description: { type: String, default: '' },
  baseSalary: { type: Number, required: true, min: [0, 'baseSalary phải lớn hơn hoặc bằng 0'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Position', positionSchema);