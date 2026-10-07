"use client";

import { useLoanStore } from "../store/loanStore";

export default function EmploymentDetails() {
  const employment = useLoanStore(
    (state) => state.formData.employment
  );

  const updateEmployment = useLoanStore(
    (state) => state.updateEmployment
  );

  const monthlyIncomeError =
    employment.monthlyIncome.length > 0 &&
    !/^[0-9]+$/.test(employment.monthlyIncome);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Employment & Financial Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please provide your employment and financial information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Employment Status */}
        <div>
          <label
            htmlFor="employmentStatus"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employment Status{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            id="employmentStatus"
            value={employment.employmentStatus}
            onChange={(e) =>
              updateEmployment({
                employmentStatus: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select employment status
            </option>

            <option value="employed">
              Employed
            </option>

            <option value="self-employed">
              Self-employed
            </option>

            <option value="business-owner">
              Business Owner
            </option>

            <option value="student">
              Student
            </option>

            <option value="unemployed">
              Unemployed
            </option>
          </select>
        </div>

        {/* Employer / Business Name */}
        <div>
          <label
            htmlFor="employerName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employer / Business Name
          </label>

          <input
            id="employerName"
            type="text"
            value={employment.employerName}
            onChange={(e) =>
              updateEmployment({
                employerName: e.target.value,
              })
            }
            placeholder="Enter employer or business name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Job Title */}
        <div>
          <label
            htmlFor="jobTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Job Title
          </label>

          <input
            id="jobTitle"
            type="text"
            value={employment.jobTitle}
            onChange={(e) =>
              updateEmployment({
                jobTitle: e.target.value,
              })
            }
            placeholder="e.g. Software Developer"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Monthly Income */}
        <div>
          <label
            htmlFor="monthlyIncome"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Monthly Income{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              ৳
            </span>

            <input
              id="monthlyIncome"
              type="text"
              inputMode="numeric"
              value={employment.monthlyIncome}
              onChange={(e) =>
                updateEmployment({
                  monthlyIncome: e.target.value,
                })
              }
              placeholder="Enter monthly income"
              className={`w-full rounded-xl border py-3 pl-9 pr-4 outline-none transition focus:ring-2 ${
                monthlyIncomeError
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
          </div>

          {monthlyIncomeError && (
            <p className="mt-2 text-sm text-red-500">
              Monthly income must contain numbers only.
            </p>
          )}
        </div>

        {/* Other Income */}
        <div>
          <label
            htmlFor="otherIncome"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Other Monthly Income
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              ৳
            </span>

            <input
              id="otherIncome"
              type="text"
              inputMode="numeric"
              value={employment.otherIncome}
              onChange={(e) =>
                updateEmployment({
                  otherIncome: e.target.value,
                })
              }
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Existing Loan */}
        <div>
          <label
            htmlFor="existingLoan"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Existing Loan / Debt
          </label>

          <select
            id="existingLoan"
            value={employment.existingLoan}
            onChange={(e) =>
              updateEmployment({
                existingLoan: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select an option
            </option>

            <option value="yes">
              Yes
            </option>

            <option value="no">
              No
            </option>
          </select>
        </div>

        {/* Monthly Obligations */}
        <div className="md:col-span-2">
          <label
            htmlFor="monthlyObligations"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Monthly Financial Obligations
          </label>

          <textarea
            id="monthlyObligations"
            rows={3}
            value={employment.monthlyObligations}
            onChange={(e) =>
              updateEmployment({
                monthlyObligations: e.target.value,
              })
            }
            placeholder="Describe your regular monthly financial obligations"
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
}

