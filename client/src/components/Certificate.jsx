// // Import dependencies
// const fs = require("fs");
// const moment = require("moment");
// const PDFDocument = require("pdfkit");

// // Create the PDF document
// const doc = new PDFDocument({
//     layout: "landscape",
//     size: "A4",
// });

// const name = "Sophia Sweet"

// // Pipe the PDF into an name.pdf file
// doc.pipe(fs.createWriteStream(`${name}.pdf`));

// // Draw the certificate image
// doc.image("assets/img/certificate.png", 0, 0, { width: 842 });

// // Remember to download the font
// // Set the font to Dancing Script
// doc.font("Iskoola Pota Regular.ttf");

// // Draw the name
// doc.fontSize(60).text(name, 20, 265, {
//     align: "center"
// });

// // Draw the date
// doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -275, 430, {
//     align: "center"
// });

// // Finalize the PDF and end the stream
// doc.end();