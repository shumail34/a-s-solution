import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const emailUser = process.env.EMAIL_USER || 'ceo@a-s-solution.online';
  const emailPass = process.env.EMAIL_PASS || 'A&Ssolution@1';

  try {
    // Hostinger SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // SSL for 465
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content setup
    const mailOptions = {
      from: `"A&S Solutions Contact Form" <${emailUser}>`,
      to: process.env.EMAIL_RECEIVER || emailUser,
      replyTo: email,
      subject: `New Inquiry from ${name}: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #07090e; color: #ffffff; border: 1px solid rgba(0, 242, 254, 0.3); border-radius: 16px;">
          <h2 style="color: #00f2fe; border-bottom: 2px solid #00f2fe; padding-bottom: 12px; margin-top: 0;">New Contact Submission</h2>
          <p style="font-size: 15px; margin: 12px 0;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 15px; margin: 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a></p>
          <p style="font-size: 15px; margin: 12px 0;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <h3 style="margin-top: 24px; color: #4facfe;">Message:</h3>
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 18px; border-left: 4px solid #00f2fe; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <footer style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #94a3b8; text-align: center;">
            Sent from A&S Solutions Website (a-s-solution.online)
          </footer>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
}
