import nodemailer from "nodemailer";

require("dotenv").config();

export async function sendEmail(
  email: string,
  url: string,
  subject: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports like 587
    auth: {
      user: "jimmy@theartisansplatform.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "'no reply' <theartisansplatform@gmail.com>", // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: "Click on this link to change your password!", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}
