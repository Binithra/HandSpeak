const router = require("express").Router();

const nodemailer = require("nodemailer");

// const fs = require("fs");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rushini29binithra@gmail.com",
    pass: "xkwo nkyq txns sihi",
  },
});

// Email content
  let mailOptions = {
    from: "HandSpeak@gmail.com",
    to: "rushini29bin@gmail.com",
    subject: "Completion of the Sinhala Sign Language Course",
    text: "Body of the email",
    attachments: [
      {
        filename: "certificate.png",
        path:"../client/src/assets/img/certificate.png",
      },
    ],
  };

  // Send email with attachment
  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log("error occurerd" + error);
    //   res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
    //   res.status(200).json({ message: "Email sent successfully" });
    }
  });


// Define the route for sending the certificate email
// router.post("/sendCertificateEmail", (req, res) => {
//   const { toEmail, attachmentPath } = req.body;

//   sendCertificateEmail(toEmail, attachmentPath);

//   res.json({ success: true });
// });

module.exports = router;
