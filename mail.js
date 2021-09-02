require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

const userMail = (to,competition,key,name) => {
// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL , // TODO: your gmail account
        pass: process.env.PASSWORD  // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'fleckoftahsin1320@gmail.com', // TODO: email sender
    to: to, // TODO: email receiver
    subject: `${competition}`,
    text:  `${name},Your Key is ${key}`
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log('Error!!!');
    }else {
    console.log(data);
    }
    
});
}

module.exports = userMail;