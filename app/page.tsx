"use client";

import { useState } from "react";
import LoanApplication from "./steps/LoanApplication";
import { useLoanStore } from "./store/loanStore";

const loanTypes = [
  {
    id: "personal" as const,
    title: "Personal Loan",
    description:
      "For personal expenses, emergencies, education and other needs.",
  },
  {
    id: "home" as const,
    title: "Home Loan",
    description:
      "For purchasing, constructing or renovating a home.",
  },
  {
    id: "business" as const,
    title: "Business Loan",
    description:
      "For business expansion, working capital and investments.",
  },
];

export default function Home() {
  const [showResume, setShowResume] = useState(true);

  const currentStep = useLoanStore((state) => state.currentStep);
  const loanType = useLoanStore((state) => state.formData.loanType);

  const setLoanType = useLoanStore(
    (state) => state.setLoanType
  );

  const setCurrentStep = useLoanStore(
    (state) => state.setCurrentStep
  );

  const resetApplication = useLoanStore(
    (state) => state.resetApplication
  );

  const hasSavedApplication =
    currentStep > 0 && Boolean(loanType);

  const handleResume = () => {
    setShowResume(false);
  };

  const handleNewApplication = () => {
    resetApplication();
    setShowResume(false);
  };

  // Saved application screen
  if (hasSavedApplication && showResume) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Loan Application
            </p>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Continue your application
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Your application was saved automatically. You can
              continue from where you left off.
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Saved Application
                </p>

                <h2 className="mt-1 text-xl font-bold capitalize text-slate-900">
                  {loanType} Loan
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  You are currently on Step {currentStep + 1} of 10.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                ✓
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${((currentStep + 1) / 7) * 100}%`,
                }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleResume}
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Resume Application
              </button>

              <button
                type="button"
                onClick={handleNewApplication}
                className="flex-1 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Start New Application
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Application form
  if (currentStep > 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <LoanApplication />
      </main>
    );
  }

  const handleContinue = () => {
    if (!loanType) return;

    setCurrentStep(1);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Loan Application
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What type of loan do you need?
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Choose the loan type that best matches your requirements.
          </p>
        </div>

        {/* Loan Types */}
        <div className="grid gap-5 md:grid-cols-3">
          {loanTypes.map((loan) => {
            const isSelected = loanType === loan.id;

            return (
              <button
                key={loan.id}
                type="button"
                onClick={() => setLoanType(loan.id)}
                className={`rounded-2xl border bg-white p-6 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {loan.title.charAt(0)}
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  {loan.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {loan.description}
                </p>

                <div className="mt-5 text-sm font-medium">
                  <span
                    className={
                      isSelected
                        ? "text-blue-600"
                        : "text-slate-400"
                    }
                  >
                    {isSelected
                      ? "Selected"
                      : "Select this loan"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!loanType}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}