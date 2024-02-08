const nodemailer = require('nodemailer');

// Create a transporter using your email service provider's SMTP settings

const emailSender=()=>{


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sichhavi48@gmail.com', // Your email address
          pass: 'hzeq fxsh kdgu iuht' // Your email password (use an app-specific password for security)
        }
      });
      
      // Email options
      const mailOptions = {
        from: 'sichhavi48@gmail.com', // Sender's email address
        to: 'exam.@gmail.com', // Recipient's email address
        subject: 'hii', // Email subject
        text: 'hello' // Email body
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error:', error.message);
        } else {
          console.log('Email sent:', info.response);
        }
        
        // Close the transporter
        transporter.close();
      });
      
}

module.exports =emailSender