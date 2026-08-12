const studentInfo = require('./student');

const students = [
  { name: 'Phạm Hoàng Thanh', scores: [8.0, 10.0, 9.5] },
  { name: 'Nguyễn Khải Anh', scores: [5.5, 6.0, 9.0] },
  { name: 'Trần Ánh Minh', scores: [4.5, 7.0, 3.5] }
];

console.log('=== BÁO CÁO KẾT QUẢ HỌC TẬP ===');

students.forEach(student => {
  studentInfo.printReport(student);
});

console.log(`-----------------------------------`);
