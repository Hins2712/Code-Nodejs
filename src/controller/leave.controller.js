const Leave = require('../models/Leave');

exports.updateLeaveStatus = async (req, res, next, targetStatus) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Không tìm thấy dữ liệu' });

    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Không cho duyệt hoặc từ chối đơn đã được xử lý' });
    }

    leave.status = targetStatus;
    await leave.save();
    res.json({ message: `Đã ${targetStatus === 'approved' ? 'duyệt' : 'từ chối'} đơn nghỉ phép`, data: leave });
  } catch (err) {
    next(err);
  }
};