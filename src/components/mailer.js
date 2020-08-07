import nodemailer from "nodemailer";

const mailer = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  const mail = {
    from: process.env.EMAIL_AUTH_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mail, (err) => {
    if (err) throw new Error(err.message);
    return `A verification email has been sent to ${mail.to}`;
  });
};

export default mailer;
