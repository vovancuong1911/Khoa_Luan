const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMailMessage = async (email, message) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'vovancuongzeno@gmail.com', // Địa chỉ email người gửi mới
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, // Đảm bảo accessToken là một chuỗi
            },
        });
        const info = await transport.sendMail({
            from: `"Maddison Foo Koch 👻" <vovancuongzeno@gmail.com>`, // Địa chỉ email người gửi mới
            to: email, // Danh sách người nhận
            subject: 'Thanks', // Tiêu đề email
            text: 'Hello world?', // Nội dung văn bản email
            html: `<b>${message}</b>`, // Nội dung HTML của email
        });
        console.log('Email sent:', info.response); // In ra phản hồi sau khi gửi email
    } catch (error) {
        console.log('Error sending email:', error); // Xử lý lỗi nếu có
    }
};

module.exports = sendMailMessage;
