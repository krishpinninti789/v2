import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/mongodb';
import User from '@/app/models/users';

// Import the same tokenStore from forget-password route (for demo, in-memory)
// In production, use a persistent store (DB)
const { tokenStore } = global;

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required.' }, { status: 400 });
    }

    // Get tokenStore from global (since modules are isolated in Next.js API routes)
    if (!global.tokenStore) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
    }
    const tokenData = global.tokenStore.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
    }
    const { email } = tokenData;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Invalidate the token
    global.tokenStore.delete(token);

    return NextResponse.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  }
}

// For demo: ensure global tokenStore exists
if (!global.tokenStore) {
  global.tokenStore = new Map();
} 