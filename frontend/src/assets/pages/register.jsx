import { useState } from "react";
import { saveProfile } from "./authProfile.js";

export default function Register({ role, onBack, onSwitchMode }) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
  });

  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "mobile") {
      setOtp("");
      setOtpRequested(false);
    }
    setMessage("");
  };

  const handleGetOTP = () => {
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtp("");
    setOtpRequested(true);
    setMessage("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!otpRequested || otp !== "123456") {
      setMessage("Please enter a valid OTP.");
      return;
    }

    if (!agreed) {
      setMessage("Please accept the Terms and Conditions.");
      return;
    }

    try {
      saveProfile({
        name: formData.fullName.trim() || role.name,
        email: formData.email.trim(),
        mobile: formData.mobile,
        roleId: role.id,
        roleName: role.name,
      });
      window.location.href = role.pagePath;
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        setMessage("Unable to save your profile because browser storage is full.");
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
            Empowering Farmers.
            <br />
            <span className="text-green-200">
              Growing Together.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-green-50">
            Create your RaithuAnna account and connect with
            agricultural services, discover farming solutions,
            and explore new opportunities.
          </p>

          <div className="mt-14 border-t border-white/20 pt-6">
            <p className="text-sm tracking-wide text-green-100">
              Empowering farmers. Growing together.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-14">

          <div className="mb-8">
            <button
              className="mb-4 text-sm font-medium text-green-700 hover:underline"
              onClick={onBack}
              type="button"
            >
              ← Back to login or register
            </button>
            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Register as <span className="font-semibold text-green-700">{role.name}</span> and get started today.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* FULL NAME */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Full Name <span className="text-gray-400">(optional)</span>
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-gray-700">
              Registering as <span className="font-semibold text-green-800">{role.name}</span>
            </div>

            {/* MOBILE NUMBER */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-3 text-gray-600">
                  +91
                </div>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
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

            {otpRequested && (
              <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Enter OTP <span className="text-red-500">*</span>
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
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address <span className="text-gray-400">(optional)</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email (optional)"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* TERMS AND CONDITIONS */}
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-green-700"
              />

              <span className="text-sm leading-5 text-gray-600">
                I agree to the{" "}
                <a
                  href="#terms"
                  className="font-medium text-green-700 hover:underline"
                >
                  Terms and Conditions
                </a>{" "}
                and Privacy Policy.
              </span>
            </label>

            {/* MESSAGE */}
            {message && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-center text-sm text-green-700">
                {message}
              </p>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              className="font-semibold text-green-700 hover:underline"
              onClick={onSwitchMode}
              type="button"
            >
              Login
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