const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db.js');
const bookRoutes = require('./routes/bookRoutes.js');

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/books', bookRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint không tồn tại' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Lỗi hệ thống (Internal Server Error)',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Library API đang chạy tại http://localhost:${PORT}`);
});