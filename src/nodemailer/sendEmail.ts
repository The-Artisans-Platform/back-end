import nodemailer from "nodemailer";

require("dotenv").config();

export async function sendEmail(
  email: string,
  url: string,
  subject: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports like 587
    auth: {
      // type: "OAuth2",
      user: "jimmy@theartisansplatform.com",
      pass: process.env.EMAIL_PASSWORD,
      // serviceClient: process.env.CLIENT_ID,
      // privateKey:
      //   process,
      // accessToken:
      //   process.env.ACCESS_TOKEN,
      // refreshToken:
      //   process.env.REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: "'no reply' <jimmy@theartisansplatform.com>", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: "Click on this link to change your password!", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}
