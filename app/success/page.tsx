"use client";

import Link from "next/link";
import { CheckCircle2, Home, FileCheck } from "lucide-react";
import { useLoanStore } from "../store/loanStore";

export default function SuccessPage() {
  const resetApplication = useLoanStore(
    (state) => state.resetApplication
  );

  const handleStartNew = () => {
    resetApplication();
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-11 w-11 text-emerald-600" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Application Submitted
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Thank You!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Your loan application has been successfully submitted.
            We have received all the information provided in your
            application.
          </p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Submission Complete
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Your application has completed all required steps.
                  Please keep this confirmation for your records.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/"
              onClick={handleStartNew}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Home className="h-4 w-4" />
              Start New Application
            </Link>

          </div>

          <p className="mt-6 text-xs text-slate-400">
            Thank you for choosing our loan application service.
          </p>

        </div>
      </div>
    </main>
  );
}