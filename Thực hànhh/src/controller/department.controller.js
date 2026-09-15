const Department = require('../models/Department');
const Employee = require('../models/Employee');

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activeEmployees = await Employee.countDocuments({ departmentId: id, status: 'active' });
    
    if (activeEmployees > 0) {
      return res.status(400).json({ message: 'Không thể xóa phòng ban vẫn còn nhân viên active' });
    }

    const dept = await Department.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
    if (!dept) return res.status(404).json({ message: 'Không tìm thấy dữ liệu' });

    res.json({ message: 'Xóa mềm phòng ban thành công', data: dept });
  } catch (err) {
    next(err);
  }
};