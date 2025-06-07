// backend/routes/inquiryRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // ייבוא nodemailer

// POST /api/send-inquiry
router.post('/send-inquiry', async (req, res) => {
  // אנו עדיין מקבלים את recipientEmail מה-Frontend, אך לא נשתמש בו ישירות בשדה "to" של האימייל
  const { name, email, phone, message, propertyId, propertyAddress /*, recipientEmail (לא בשימוש ישיר לנמען) */ } = req.body;

  console.log('Received inquiry for /api/send-inquiry:');
  console.log('Name:', name);
  console.log('Email from (sender):', email); // האימייל של מי שמילא את הטופס
  console.log('Phone:', phone);
  console.log('Message:', message);
  if (propertyId) console.log('Property ID:', propertyId);
  if (propertyAddress) console.log('Property Address:', propertyAddress);
  // console.log('Recipient Email from frontend (not used for "to" field):', recipientEmail); // להמחשה בלבד

  // ולידציה בסיסית של הקלט
  if (!name || !email || !phone || !message) { // recipientEmail לא נבדק כאן כי הוא לא ישמש לנמען מה-body
    console.error("Validation Error: Missing required fields from form.");
    return res.status(400).json({ success: false, message: 'נא למלא את כל שדות החובה: שם, אימייל, טלפון והודעה.' });
  }

  // בדיקה אם הוגדר אימייל נמען בשרת
  if (!process.env.RECIPIENT_EMAIL) {
    console.error("Server Configuration Error: RECIPIENT_EMAIL is not defined in backend .env file.");
    return res.status(500).json({ success: false, message: 'שגיאת תצורה בשרת. לא ניתן לשלוח את הפנייה כרגע.' });
  }

  // יצירת Transporter של Nodemailer באמצעות משתני הסביבה
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === 'true', // המרה לבוליאני
    auth: {
      user: process.env.SMTP_USER, // לדוגמה "apikey" עבור SendGrid
      pass: process.env.SMTP_PASS, // מפתח ה-API שלך
    },
  });

  // הכנת תוכן האימייל
  let emailSubject = `פנייה חדשה מאתר הנדל"ן - ${name}`;
  let emailHtmlBody = `
    <h1>פנייה חדשה מאתר הנדל"ן</h1>
    <p><strong>שם הפונה:</strong> ${name}</p>
    <p><strong>אימייל לחזרה:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>טלפון לחזרה:</strong> <a href="tel:${phone}">${phone}</a></p>
  `;

  if (propertyAddress) {
    emailSubject = `פנייה בנוגע לנכס: ${propertyAddress} - מאת ${name}`;
    emailHtmlBody += `<p><strong>בנוגע לנכס:</strong> ${propertyAddress} (ID: ${propertyId || 'לא צוין'})</p>`;
  }

  emailHtmlBody += `
    <hr style="margin: 20px 0;">
    <h3>הודעה:</h3>
    <p style="white-space: pre-wrap; font-size: 1.1em;">${message}</p>
    <hr style="margin: 20px 0;">
    <p style="font-size: 0.9em; color: #555;">זוהי הודעה אוטומטית מאתר הנדל"ן שלך.</p>
  `;

  const mailOptions = {
    from: `"אתר נדל"ן - פנייה מ ${name}" <${process.env.EMAIL_FROM_ADDRESS}>`, // האימייל המאומת שלך ב-SendGrid
    to: process.env.RECIPIENT_EMAIL, //  <<< האימייל שאליו הפניות מגיעות (מוגדר ב-backend/.env)
    replyTo: email,     // האימייל של הפונה
    subject: emailSubject,
    html: emailHtmlBody,
  };

  try {
    console.log(`Attempting to send email via Nodemailer to: ${process.env.RECIPIENT_EMAIL}`);
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! Message ID:', info.messageId);
    // console.log('Preview URL (if available, for some transporters like Ethereal): %s', nodemailer.getTestMessageUrl(info));
    res.status(200).json({ success: true, message: 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.' });
  } catch (error) {
    console.error('Error sending email with Nodemailer:', error);
    // שקול אם להחזיר הודעה גנרית יותר למשתמש, ולתעד את השגיאה המפורטת בצד השרת בלבד.
    res.status(500).json({ success: false, message: 'אירעה שגיאה פנימית בשליחת הפנייה. אנא נסה שוב מאוחר יותר או פנה ישירות.' });
  }
});

module.exports = router;