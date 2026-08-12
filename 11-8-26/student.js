const getAverage = (scores) => {
  if (!scores || scores.length === 0) return 0;
  const total = scores.reduce((sum, score) => sum + score, 0);
  return (total / scores.length).toFixed(2);
};

const getRank = (average) => {
  const avg = parseFloat(average);
  if (avg >= 9.0) return 'Xuất sắc';
  if (avg >= 8.0) return 'Giỏi';
  if (avg >= 6.5) return 'Khá';
  if (avg >= 5.0) return 'Trung bình';
  return 'Yếu';
};

const printReport = (student) => {
  const avg = getAverage(student.scores);
  const rank = getRank(avg);
  
  console.log(`-----------------------------------`);
  console.log(`Học viên:   ${student.name}`);
  console.log(`Điểm số:    ${student.scores.join(', ')}`);
  console.log(`ĐTB:        ${avg}`);
  console.log(`Xếp loại:   ${rank}`);
};

module.exports = { getAverage, getRank, printReport };
