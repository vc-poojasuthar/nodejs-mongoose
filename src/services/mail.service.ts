import nodemailer from "nodemailer";
import ejs from "ejs";
import * as dotenv from "dotenv";
dotenv.config();

class MailService {
  private transporter: nodemailer.Transporter; 

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:  process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  
  async sendActivationEmail(to: string, subject: string, templateName: string, templateData: any) {
   const htmlContent = await ejs.renderFile(`templates/${templateName}.ejs`, templateData);
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      cc: process.env.EMAIL_CC,
      subject,
      html: htmlContent as string,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

export default new MailService();