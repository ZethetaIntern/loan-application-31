"use client";

import { useLoanStore } from "../store/loanStore";

export default function AddressDetails() {
  const address = useLoanStore((state) => state.formData.address);
  const updateAddress = useLoanStore((state) => state.updateAddress);

  const postalCodeError =
    address.postalCode.length > 0 &&
    !/^[0-9]{4,6}$/.test(address.postalCode);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Address Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please provide your current residential address.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Street Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="street"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Street Address <span className="text-red-500">*</span>
          </label>

          <textarea
            id="street"
            rows={3}
            value={address.street}
            onChange={(e) =>
              updateAddress({
                street: e.target.value,
              })
            }
            placeholder="Enter your street address"
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            City <span className="text-red-500">*</span>
          </label>

          <input
            id="city"
            type="text"
            value={address.city}
            onChange={(e) =>
              updateAddress({
                city: e.target.value,
              })
            }
            placeholder="Enter your city"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Postal Code <span className="text-red-500">*</span>
          </label>

          <input
            id="postalCode"
            type="text"
            inputMode="numeric"
            value={address.postalCode}
            onChange={(e) =>
              updateAddress({
                postalCode: e.target.value,
              })
            }
            placeholder="Enter postal code"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
              postalCodeError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />

          {postalCodeError && (
            <p className="mt-2 text-sm text-red-500">
              Please enter a valid postal code.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}