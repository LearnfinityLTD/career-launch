"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Loader2 } from "lucide-react";

type LoginResponse =
  | { ok: true; redirect?: string }
  | { ok: false; error: string }
  | { mfa: true; ticket: string }; // server signals MFA step

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // MFA
  const [ticket, setTicket] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data: LoginResponse = await res.json();

      if ("mfa" in data && data.mfa) {
        setTicket(data.ticket);
      } else if ("ok" in data && data.ok) {
        window.location.href = data.redirect || "/admin"; // default target after auth
      } else {
        setError(("error" in data && data.error) || "Sign in failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket, otp }),
      });
      const data: { ok?: boolean; error?: string; redirect?: string } =
        await res.json();
      if (data.ok) {
        window.location.href = data.redirect || "/admin";
      } else setError(data.error || "Invalid code");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="mx-auto max-w-md px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-4 w-4" /> University Access
            </div>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              Sign in to your institution
            </h1>
            <p className="text-sm text-slate-600">
              Use your university credentials or single sign-on.
            </p>
          </div>

          {/* Step 1: Email / password */}
          {!ticket && (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  University email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="name@university.ac.uk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign in
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-slate-500">
                    or continue with
                  </span>
                </div>
              </div>

              {/* SSO shortcuts (wire these routes on server) */}
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="/api/sso/azure" // implement on server
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 text-center"
                >
                  Azure AD
                </a>
                <a
                  href="/api/sso/okta"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 text-center"
                >
                  Okta
                </a>
                <a
                  href="/api/sso/google"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 text-center"
                >
                  Google
                </a>
              </div>

              <p className="text-[11px] leading-4 text-slate-500">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}

          {/* Step 2: MFA code */}
          {ticket && (
            <form onSubmit={onVerifyOtp} className="space-y-4">
              <div className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-800">
                We&apos;ve sent a 6-digit code to your authenticator / email.
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Verification code
                </label>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Verify & continue
                </button>
                <button
                  type="button"
                  onClick={() => setTicket(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Need help?{" "}
          <a className="underline" href="mailto:hello@careerlaunch.uk">
            hello@careerlaunch.uk
          </a>
        </p>
      </main>
    </div>
  );
}
