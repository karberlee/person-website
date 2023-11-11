const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = (to, subject, text, html) => {
  sgMail
  .send({
    to, // email receiver
    from: process.env.SENDGRID_SENDER, // sendgrid verified sender
    subject,  // email subject
    text, // email text content
    html, // email body content
  })
  .then(() => {
    console.log('Email sent to =>', to)
  })
  .catch((error) => {
    console.error(error)
  })
}