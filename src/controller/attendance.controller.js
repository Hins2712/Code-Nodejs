const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res, next) => {
  try {
    const employeeId = req.body.employeeId || req.user.employeeId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await Attendance.findOne({
      employeeId,
      date: { $gte: today, $lt: tomorrow }
    });

    if (existing) {
      return res.status(400).json({ message: 'Một nhân viên chỉ được check-in một lần trong một ngày' });
    }

    const attendance = await Attendance.create({
      employeeId,
      date: new Date(),
      checkIn: new Date(),
      status: 'present'
    });

    res.status(201).json({ message: 'Check-in thành công', data: attendance });
  } catch (err) {
    next(err);
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    const employeeId = req.body.employeeId || req.user.employeeId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const record = await Attendance.findOne({
      employeeId,
      date: { $gte: today, $lt: tomorrow }
    });

    if (!record) {
      return res.status(400).json({ message: 'Không được check-out nếu chưa check-in' });
    }
    if (record.checkOut) {
      return res.status(400).json({ message: 'Không được check-out nhiều lần trong cùng một ngày' });
    }

    const checkOutTime = new Date();
    const workingHours = (checkOutTime - new Date(record.checkIn)) / (1000 * 60 * 60);

    record.checkOut = checkOutTime;
    record.workingHours = Number(workingHours.toFixed(2));
    await record.save();

    res.json({ message: 'Check-out thành công', data: record });
  } catch (err) {
    next(err);
  }
};