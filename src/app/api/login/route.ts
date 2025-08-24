import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// TODO: replace with your database query
const mockUser = {
  id: "u_1",
  email: "admin@university.ac.uk",
  // password: "Passw0rd!" hashed:
  passwordHash: "$2a$10$3GkU7Y7X3r0s1Q8vQxq0HefhCqv8lqVhQZC2kQnZ0u9N2r3TQm1xW",
  mfaEnabled: true,
};

export async function POST(req: Request) {
  try {
    const { email, password, remember } = await req.json();

    // Basic guard
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Missing credentials" },
        { status: 400 }
      );
    }

    // Lookup user (replace with your DB)
    if (email.toLowerCase() !== mockUser.email) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, mockUser.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // If MFA is enabled, return a one-time ticket for step 2
    if (mockUser.mfaEnabled) {
      // TODO: generate+store a ticket in DB/redis and send code via email/SMS/TOTP
      const ticket = `tkt_${Math.random().toString(36).slice(2, 10)}`;
      // For demo, you'd also send a code here. We only signal the second step.
      return NextResponse.json({ mfa: true, ticket });
    }

    // Otherwise, establish a session (HttpOnly cookie). Replace with your session logic.
    const session = `sess_${Math.random().toString(36).slice(2)}`;
    const res = NextResponse.json({ ok: true, redirect: "/admin" });
    res.cookies.set("cl_session", session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days if remember
      path: "/",
    });
    return res;
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
