const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tiêu đề sách không được để trống'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Tác giả không được để trống'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Thể loại không được để trống'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Giá sách không được để trống'],
    min: [0, 'Giá sách phải >= 0']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Số lượng tồn kho phải >= 0']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);