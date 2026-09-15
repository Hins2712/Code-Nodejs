exports.convertToCSV = (data) => {
  const headers = ['Ma NV', 'Ho Ten', 'Email', 'So Dien Thoai', 'Phong Ban', 'Chuc Vu', 'Trang Thai'];
  const rows = data.map(emp => [
    emp.employeeCode,
    `"${emp.fullName}"`,
    emp.email,
    emp.phone,
    `"${emp.departmentId ? emp.departmentId.name : ''}"`,
    `"${emp.positionId ? emp.positionId.name : ''}"`,
    emp.status
  ]);

  return [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
};