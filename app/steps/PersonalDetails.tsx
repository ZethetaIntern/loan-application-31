"use client";

import { useLoanStore } from "../store/loanStore";

export default function PersonalDetails() {
  const personal = useLoanStore((state) => state.formData.personal);
  const updatePersonal = useLoanStore((state) => state.updatePersonal);

  const fullNameError =
    personal.fullName.length > 0 && personal.fullName.trim().length < 3;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Personal Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please provide your basic personal information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            id="fullName"
            type="text"
            value={personal.fullName}
            onChange={(e) =>
              updatePersonal({
                fullName: e.target.value,
              })
            }
            placeholder="Enter your full name"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
              fullNameError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />

          {fullNameError && (
            <p className="mt-2 text-sm text-red-500">
              Full name must be at least 3 characters.
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            id="dateOfBirth"
            type="date"
            value={personal.dateOfBirth}
            onChange={(e) =>
              updatePersonal({
                dateOfBirth: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            id="gender"
            value={personal.gender}
            onChange={(e) =>
              updatePersonal({
                gender: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}