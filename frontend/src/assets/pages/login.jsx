import { useState } from "react";
import { getRegisteredProfile, saveProfile } from "./authProfile.js";

export default function Login({ role, onBack, onSwitchMode }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [message, setMessage] = useState("");

  const handleGetOTP = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtp("");
    setOtpRequested(true);
    setMessage("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!otpRequested || otp !== "123456") {
      setMessage("Please enter a valid OTP.");
      return;
    }

    try {
      const profile = getRegisteredProfile(role.id, mobile);
      if (!profile) {
        setMessage("No account was found for this role and mobile number. Please register first.");
        return;
      }

      saveProfile(profile);
      window.location.href = role.pagePath;
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        setMessage("Unable to load your profile because browser storage is full.");
        return;
      }

      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0faf3] px-4 py-10 md:px-8">
      <div className="mx-auto grid min-h-[85vh] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* LEFT SIDE - CLEAN BRANDING */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 p-8 text-white md:p-16">

          <div className="mb-14">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              RaithuAnna
            </h1>

            <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-green-200">
              Smart Agriculture Platform
            </p>
          </div>

          <h2 className="max-w-md text-3xl font-bold leading-tight md:text-5xl">
            Welcome Back!
            <br />
            <span className="text-green-200">
              Your Farming Journey Awaits.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-green-50">
            Sign in to your RaithuAnna account to connect with
            agricultural services, manage your activities, and
            explore new opportunities.
          </p>

          <div className="mt-14 border-t border-white/20 pt-6">
            <p className="text-sm tracking-wide text-green-100">
              Empowering farmers. Growing together.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-14">

          <div className="mb-8">
            <button
              className="mb-4 text-sm font-medium text-green-700 hover:underline"
              onClick={onBack}
              type="button"
            >
              ← Choose a different role
            </button>
            <h2 className="text-3xl font-bold text-gray-900">
              Login
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Login as <span className="font-semibold text-green-700">{role.name}</span> using your mobile number.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* MOBILE NUMBER */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <div className="flex gap-2">
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-3 text-gray-600">
                  +91
                </div>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setOtp("");
                    setOtpRequested(false);
                    setMessage("");
                  }}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGetOTP}
              className="w-full rounded-xl border border-green-700 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              {otpRequested ? "Resend OTP" : "Get OTP"}
            </button>

            {otpRequested && <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 tracking-widest outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>}

            {/* MESSAGE */}
            {message && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-center text-sm text-green-700">
                {message}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800"
            >
              Login
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              className="font-semibold text-green-700 hover:underline"
              onClick={onSwitchMode}
              type="button"
            >
              Register
            </button>
          </p>

          {/* HOME LINK */}
          <div className="mt-3 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 transition hover:text-green-700"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}