const os = require('os');

console.log('=== THÔNG TIN HỆ THỐNG ===');
console.log(`Tên hệ điều hành: ${os.type()}`);
console.log(`Platform:        ${os.platform()}`);
console.log(`Tổng RAM:        ${(os.totalmem())} bytes`);
console.log(`RAM còn trống:   ${(os.freemem())} bytes`);
console.log(`Số CPU cores:    ${os.cpus().length}`);
