const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes declaration
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/departments', require('./routes/department.routes'));
app.use('/api/positions', require('./routes/position.routes'));
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/attendances', require('./routes/attendance.routes'));
app.use('/api/leaves', require('./routes/leave.routes'));
app.use('/api/statistics', require('./routes/statistic.routes'));

app.use(errorHandler);

module.exports = app;
