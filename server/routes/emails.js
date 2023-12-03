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

// Define the route for sending the certificate email
router.post("/sendCertificateEmail", (req, res) => {
  const { email, score } = req.body;

  // Check if the user's score is greater than 50
  if (score > 90) {
    // Email content
    let mailOptions = {
      from: "handSpeak@gmail.com",
      to: email,
      subject: "සිංහල සංඥා භාෂා පාඨමාලාව සාර්ථකව අවසන් කිරීම",
      text: "හිතවත් ශිෂ්‍යනි/දෙමපියෙනි, \nශ්‍රවණාබාධිත ළමුන් සඳහා නිර්මාණය කර ඇති අපගේ සිංහල ඉගෙනුම් වේදිකාවේ ඉගෙනුම් මොඩියුල ඔබ සාර්ථකව නිම කර ඇති බව ඔබට දන්වා සිටින්නේ ඉතා සතුටිනි. \nඔබගේ ජයග්‍රහණය අගයමින්, මෙම විද්‍යුත් තැපෑලට අමුණා ඇති සම්පූර්ණ කිරීමේ සහතිකයක් ඔබට පිරිනැමීමට අපි සතුටු වෙමු. මෙම සහතිකය ඉගෙනීමේ ක්‍රියාවලිය සඳහා ඔබේ වෙහෙස මහන්සි වී වැඩ කිරීම සහ කැපවීම පිළිබඳ සාක්ෂියක් ලෙස සේවය කරයි.\n\nස්තූතියි. \nHandSpeak කාර්ය මණ්ඩලයෙන්",
      attachments: [
        {
          filename: "certificate.png",
          path: "../client/src/assets/img/certificate.png",
        },
      ],
    };

    // Send email with attachment
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred: " + error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    // Optionally, you can provide feedback to the client that they need a higher score
    res
      .status(400)
      .json({ error: "User's score is not sufficient for the certificate" });
  }
});

module.exports = router;
