import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const WEBSITE_URL = "https://orca-app-tcqol.ondigitalocean.app/"

const mailOptions = {
  from: process.env["EMAIL_USER"],
  subject: "JEMS password reset"
}

export default function sendPassReset(crypt: string, target: string): Promise<any> {
  return sendEmail(
    `<h1>Oops! You forgot your password</h1> <p> Reset your password here at:
     ${WEBSITE_URL}reset/${crypt}</p>`,
    target
  )
}


function sendEmail(message: string, target: string): Promise<any>{
  try {
    // Create oauth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.EMAIL_CLIENT_ID,
      process.env.EMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });


    const token = oauth2Client.getAccessToken()
    console.log(token)

      //create emailer
      const transporter = nodemailer.createTransport<any>({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          type: "OAuth2",
          accessToken: token,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        }
      } as any);

       // send mail
       return transporter.sendMail({
           ...mailOptions,
           to: target,
           text: message,
           html: message
       })
    
  } catch (error) {
    console.log("mailer error:", error);
    
  }
}
