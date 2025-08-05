import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.SMPT_MAIL ||
  !process.env.SMPT_PASSWORD ||
  !process.env.SMPT_SERVICE
) {
  console.log(
    "Please provide SMPT_MAIL, SMPT_PASSWORD, and SMPT_SERVICE in your .env file"
  );
}

const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `Binkeyit <${process.env.SMPT_MAIL}>`,
      to: sendTo,
      subject: subject,
      html: html,
    });
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendEmail;
