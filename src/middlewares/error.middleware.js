module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Lỗi hệ thống';
  let errors = [];

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dữ liệu không hợp lệ';
    errors = Object.values(err.errors).map(val => val.message);
    return res.status(statusCode).json({ message, errors });
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} đã tồn tại trong hệ thống`;
    return res.status(statusCode).json({ message });
  }

  res.status(statusCode).json({ message });
};