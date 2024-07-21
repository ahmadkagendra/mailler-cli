import nodemailer from 'nodemailer';
import 'dotenv/config';


export class ThrowMail {
  constructor({email , password , emailTarget}) {
    this.email = email;
    this.password = password;
    this.emailTarget = emailTarget;
    this.content = {};
    this.config = {
      service : 'gmail',
      host : 'smtp.gmail.com',
      port : '587',
      secure : false,
      auth: {
        user: email,
        pass: password,
      },
    };
  }
  mailContent ({subject , text}) {
    this.content = {   
      from : {
        name : 'noreply',
        address : this.email,
      },
      to : this.emailTarget,
      subject : subject,
      text : text,
    }
    return this
  }
  send () {
    const transporter = nodemailer.createTransport(this.config);
    const sendMail = transporter.sendMail(this.content);
    return sendMail
    
  }
}