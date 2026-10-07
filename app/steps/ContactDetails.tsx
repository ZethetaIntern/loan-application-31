"use client";

import { useLoanStore } from "../store/loanStore";

export default function ContactDetails() {
  const contact = useLoanStore((state) => state.formData.contact);
  const updateContact = useLoanStore((state) => state.updateContact);

  const emailError =
    contact.email.length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);

  const phoneError =
    contact.phone.length > 0 &&
    !/^[0-9+\-\s()]{10,15}$/.test(contact.phone);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Contact Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please provide your contact information so we can reach you.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            id="email"
            type="email"
            value={contact.email}
            onChange={(e) =>
              updateContact({
                email: e.target.value,
              })
            }
            placeholder="you@example.com"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
              emailError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />

          {emailError && (
            <p className="mt-2 text-sm text-red-500">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            id="phone"
            type="tel"
            value={contact.phone}
            onChange={(e) =>
              updateContact({
                phone: e.target.value,
              })
            }
            placeholder="01XXXXXXXXX"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
              phoneError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />

          {phoneError && (
            <p className="mt-2 text-sm text-red-500">
              Please enter a valid phone number.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}