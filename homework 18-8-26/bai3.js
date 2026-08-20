const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendMail() {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'loan.pt.1888@aptechlearning.edu.vn',
            subject: 'Thử nghiệm gửi mail từ NodeJS',
            text: 'Chào bạn, đây là email tự động được gửi bằng Nodemailer và App Password!'
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi thành công!');
        console.log('Message ID:', info.messageId);

    } catch (error) {
        console.error('Đã xảy ra lỗi khi gửi email:', error.message);
    }
}

sendMail();
