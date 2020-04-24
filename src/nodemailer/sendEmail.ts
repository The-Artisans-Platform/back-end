import nodemailer from "nodemailer";

require("dotenv").config();

export async function sendEmail(email: string, url: string): Promise<void> {
  // const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tetris.react@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
      // user: testAccount.user,
      // pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: '"Tetrix 🕹" <tetris.react@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot your password ❓", // Subject line
    text: "Click on this link to change your password!", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
