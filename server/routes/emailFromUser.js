// const router = require("express").Router();
// const nodemailer = require("nodemailer");

// app.post("/send-email", (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // Set up Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "your-email@gmail.com",
//       pass: "your-email-password",
//     },
//   });

//   // Email configuration
//   const mailOptions = {
//     from: email,
//     to: "rushini29binithra@gmail.com", // Replace with your admin's email
//     subject: subject,
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//    // Send email with attachment
//    transporter.sendMail(mailOptions, (error, info) =>{
//     if (error) {
//       console.log("error occurerd" + error);
//     //   res.status(500).json({ error: "Failed to send email" });
//     } else {
//       console.log("Email sent: " + info.response);
//     //   res.status(200).json({ message: "Email sent successfully" });
//     }
//   });

// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// module.exports = router;