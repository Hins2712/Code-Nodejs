const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Position = require('../models/Position');

exports.getOverview = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'active' });
    const probationEmployees = await Employee.countDocuments({ status: 'probation' });
    const resignedEmployees = await Employee.countDocuments({ status: 'resigned' });
    const totalDepartments = await Department.countDocuments({ status: { $ne: 'inactive' } });
    const totalPositions = await Position.countDocuments({ status: { $ne: 'inactive' } });

    res.json({
      message: 'Lấy thống kê tổng quan thành công',
      data: {
        totalEmployees,
        activeEmployees,
        probationEmployees,
        resignedEmployees,
        totalDepartments,
        totalPositions
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBirthdays = async (req, res, next) => {
  try {
    const month = parseInt(req.query.month) || (new Date().getMonth() + 1);
    const employees = await Employee.aggregate([
      {
        $project: {
          employeeCode: 1,
          fullName: 1,
          email: 1,
          dateOfBirth: 1,
          month: { $month: '$dateOfBirth' }
        }
      },
      { $match: { month: month } }
    ]);
    res.json({ message: 'Lấy danh sách sinh nhật thành công', data: employees });
  } catch (err) {
    next(err);
  }
};

exports.getProbationEnding = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const now = new Date();
    
    // Giả sử thử việc 60 ngày
    const probationDays = 60;
    
    const employees = await Employee.find({ status: 'probation' });
    const result = employees.filter(emp => {
      const probationEndDate = new Date(emp.startDate);
      probationEndDate.setDate(probationEndDate.getDate() + probationDays);
      
      const diffTime = probationEndDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 0 && diffDays <= days;
    });

    res.json({ message: 'Lấy danh sách sắp hết thử việc thành công', data: result });
  } catch (err) {
    next(err);
  }
};