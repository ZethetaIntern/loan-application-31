"use client";

import { useLoanStore } from "../store/loanStore";

export default function LoanDetails() {
  const loanType = useLoanStore(
    (state) => state.formData.loanType
  );

  const loan = useLoanStore(
    (state) => state.formData.loan
  );

  const personalLoan = useLoanStore(
    (state) => state.formData.personalLoan
  );

  const homeLoan = useLoanStore(
    (state) => state.formData.homeLoan
  );

  const businessLoan = useLoanStore(
    (state) => state.formData.businessLoan
  );

  const updateLoan = useLoanStore(
    (state) => state.updateLoan
  );

  const updatePersonalLoan = useLoanStore(
    (state) => state.updatePersonalLoan
  );

  const updateHomeLoan = useLoanStore(
    (state) => state.updateHomeLoan
  );

  const updateBusinessLoan = useLoanStore(
    (state) => state.updateBusinessLoan
  );

  const amountError =
    loan.amount.length > 0 &&
    !/^[0-9]+$/.test(loan.amount);

  const propertyValueError =
    homeLoan.propertyValue.length > 0 &&
    !/^[0-9]+$/.test(homeLoan.propertyValue);

  const annualTurnoverError =
    businessLoan.annualTurnover.length > 0 &&
    !/^[0-9]+$/.test(businessLoan.annualTurnover);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Loan Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tell us how much you need and what you need the loan for.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Loan Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Loan Amount{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              ৳
            </span>

            <input
              id="amount"
              type="text"
              inputMode="numeric"
              value={loan.amount}
              onChange={(e) =>
                updateLoan({
                  amount: e.target.value,
                })
              }
              placeholder="Enter loan amount"
              className={`w-full rounded-xl border py-3 pl-9 pr-4 outline-none transition focus:ring-2 ${
                amountError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
          </div>

          {amountError && (
            <p className="mt-2 text-sm text-red-500">
              Loan amount must contain numbers only.
            </p>
          )}
        </div>

        {/* Loan Tenure */}
        <div>
          <label
            htmlFor="tenure"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Loan Tenure{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            id="tenure"
            value={loan.tenure}
            onChange={(e) =>
              updateLoan({
                tenure: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select tenure
            </option>

            <option value="12">
              12 Months
            </option>

            <option value="24">
              24 Months
            </option>

            <option value="36">
              36 Months
            </option>

            <option value="48">
              48 Months
            </option>

            <option value="60">
              60 Months
            </option>
          </select>
        </div>

        {/* Personal Loan Fields */}
        {loanType === "personal" && (
          <div className="md:col-span-2">
            <label
              htmlFor="expenseType"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Expense Type{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              id="expenseType"
              value={personalLoan.expenseType}
              onChange={(e) =>
                updatePersonalLoan({
                  expenseType: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select expense type
              </option>

              <option value="education">
                Education
              </option>

              <option value="medical">
                Medical
              </option>

              <option value="wedding">
                Wedding
              </option>

              <option value="travel">
                Travel
              </option>

              <option value="emergency">
                Emergency
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        )}

        {/* Home Loan Fields */}
        {loanType === "home" && (
          <>
            <div>
              <label
                htmlFor="propertyType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Property Type{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="propertyType"
                value={homeLoan.propertyType}
                onChange={(e) =>
                  updateHomeLoan({
                    propertyType: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select property type
                </option>

                <option value="apartment">
                  Apartment
                </option>

                <option value="house">
                  House
                </option>

                <option value="land">
                  Land
                </option>

                <option value="construction">
                  Construction
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="propertyValue"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Property Value{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ৳
                </span>

                <input
                  id="propertyValue"
                  type="text"
                  inputMode="numeric"
                  value={homeLoan.propertyValue}
                  onChange={(e) =>
                    updateHomeLoan({
                      propertyValue: e.target.value,
                    })
                  }
                  placeholder="Enter property value"
                  className={`w-full rounded-xl border py-3 pl-9 pr-4 outline-none transition focus:ring-2 ${
                    propertyValueError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {propertyValueError && (
                <p className="mt-2 text-sm text-red-500">
                  Property value must contain numbers only.
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="propertyLocation"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Property Location{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="propertyLocation"
                type="text"
                value={homeLoan.propertyLocation}
                onChange={(e) =>
                  updateHomeLoan({
                    propertyLocation: e.target.value,
                  })
                }
                placeholder="Enter property location"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </>
        )}

        {/* Business Loan Fields */}
        {loanType === "business" && (
          <>
            <div>
              <label
                htmlFor="businessName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Business Name{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="businessName"
                type="text"
                value={businessLoan.businessName}
                onChange={(e) =>
                  updateBusinessLoan({
                    businessName: e.target.value,
                  })
                }
                placeholder="Enter business name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="businessType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Business Type{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="businessType"
                value={businessLoan.businessType}
                onChange={(e) =>
                  updateBusinessLoan({
                    businessType: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select business type
                </option>

                <option value="retail">
                  Retail
                </option>

                <option value="wholesale">
                  Wholesale
                </option>

                <option value="service">
                  Service
                </option>

                <option value="manufacturing">
                  Manufacturing
                </option>

                <option value="technology">
                  Technology
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="annualTurnover"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Annual Turnover{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ৳
                </span>

                <input
                  id="annualTurnover"
                  type="text"
                  inputMode="numeric"
                  value={businessLoan.annualTurnover}
                  onChange={(e) =>
                    updateBusinessLoan({
                      annualTurnover: e.target.value,
                    })
                  }
                  placeholder="Enter annual turnover"
                  className={`w-full rounded-xl border py-3 pl-9 pr-4 outline-none transition focus:ring-2 ${
                    annualTurnoverError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {annualTurnoverError && (
                <p className="mt-2 text-sm text-red-500">
                  Annual turnover must contain numbers only.
                </p>
              )}
            </div>
          </>
        )}

        {/* Loan Purpose */}
        <div className="md:col-span-2">
          <label
            htmlFor="purpose"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Loan Purpose{" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            id="purpose"
            rows={4}
            value={loan.purpose}
            onChange={(e) =>
              updateLoan({
                purpose: e.target.value,
              })
            }
            placeholder="Explain why you need this loan..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>
    </div>
  );
}

