import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ticket, otp } = await req.json();
    if (!ticket || !otp) {
      return NextResponse.json(
        { error: "Missing verification details" },
        { status: 400 }
      );
    }

    // TODO: verify OTP for ticket from your store / TOTP
    const isValid = otp === "123456"; // replace with real validation
    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 401 });
    }

    // Create session cookie
    const session = `sess_${Math.random().toString(36).slice(2)}`;
    const res = NextResponse.json({ ok: true, redirect: "/admin" });
    res.cookies.set("cl_session", session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
