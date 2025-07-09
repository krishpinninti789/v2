import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// For demo: ensure global tokenStore exists
if (!global.tokenStore) {
  global.tokenStore = new Map();
}
const tokenStore = global.tokenStore;

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    tokenStore.set(token, { email, expires });

    // Construct reset link (adjust base URL as needed)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    // Create a test account and transporter using Ethereal
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: 'no-reply@example.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    // Preview URL for Ethereal (for dev/testing)
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(previewUrl);
    

    return NextResponse.json({ message: 'Reset link sent if email is registered.', previewUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send reset link.' }, { status: 500 });
  }
}