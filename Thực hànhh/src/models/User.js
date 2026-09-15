const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'fullName không được rỗng'] },
  email: { 
    type: String, 
    required: [true, 'email bắt buộc'], 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Email không đúng định dạng'] 
  },
  password: { type: String, required: [true, 'password bắt buộc'], minlength: 6, select: false },
  role: { type: String, enum: ['admin', 'hr', 'staff'], default: 'staff' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  avatarUrl: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);