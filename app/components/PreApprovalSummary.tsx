"use client";

import {
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useLoanStore } from "../store/loanStore";

export default function PreApprovalSummary() {
  const formData = useLoanStore((state) => state.formData);

  const { loan, employment } = formData;

  const loanAmount = Number(loan.amount) || 0;
  const monthlyIncome =
    Number(employment.monthlyIncome) || 0;
  const monthlyObligations =
    Number(employment.monthlyObligations) || 0;

  const tenureMonths = getTenureMonths(loan.tenure);

  const estimatedRate = 10.5;

  const monthlyRate =
    estimatedRate / 100 / 12;

  const estimatedEmi =
    loanAmount > 0 && tenureMonths > 0
      ? calculateEmi(
          loanAmount,
          monthlyRate,
          tenureMonths
        )
      : 0;

  const totalMonthlyObligations =
    monthlyObligations + estimatedEmi;

  const debtToIncome =
    monthlyIncome > 0
      ? (totalMonthlyObligations / monthlyIncome) * 100
      : 0;

  const eligible =
    loanAmount > 0 &&
    monthlyIncome > 0 &&
    debtToIncome <= 50;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />

          <h2 className="text-2xl font-bold text-slate-900">
            Pre-Approval Summary
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Here is an estimated summary based on the
          information you provided.
        </p>
      </div>

      {/* Eligibility */}
      <div
        className={`rounded-xl border p-5 ${
          eligible
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className="flex items-start gap-3">
          {eligible ? (
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
          ) : (
            <CreditCard className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
          )}

          <div>
            <h3
              className={`font-semibold ${
                eligible
                  ? "text-emerald-800"
                  : "text-amber-800"
              }`}
            >
              {eligible
                ? "Preliminary eligibility looks positive"
                : "Additional review may be required"}
            </h3>

            <p
              className={`mt-1 text-sm ${
                eligible
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`}
            >
              {eligible
                ? "Based on the entered financial information, the application meets the preliminary affordability criteria."
                : "The entered financial information may require additional assessment before approval."}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SummaryCard
          icon={
            <CircleDollarSign className="h-5 w-5" />
          }
          label="Requested Amount"
          value={formatCurrency(loanAmount)}
        />

        <SummaryCard
          icon={<Wallet className="h-5 w-5" />}
          label="Monthly Income"
          value={formatCurrency(monthlyIncome)}
        />

        <SummaryCard
          icon={<CreditCard className="h-5 w-5" />}
          label="Estimated Monthly EMI"
          value={formatCurrency(estimatedEmi)}
        />

        <SummaryCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Debt-to-Income Ratio"
          value={`${debtToIncome.toFixed(1)}%`}
        />
      </div>

      {/* Financial Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-4 font-semibold text-slate-900">
          Financial Breakdown
        </h3>

        <div className="space-y-3">
          <SummaryRow
            label="Existing Monthly Obligations"
            value={formatCurrency(monthlyObligations)}
          />

          <SummaryRow
            label="Estimated New EMI"
            value={formatCurrency(estimatedEmi)}
          />

          <SummaryRow
            label="Total Monthly Commitments"
            value={formatCurrency(
              totalMonthlyObligations
            )}
          />

          <SummaryRow
            label="Estimated Interest Rate"
            value={`${estimatedRate}% p.a.`}
          />

          <SummaryRow
            label="Loan Tenure"
            value={loan.tenure || "Not provided"}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs leading-5 text-slate-500">
          This pre-approval summary is an estimate based on
          the information entered in this application. It is
          not a final loan approval, offer, or guarantee.
          Actual eligibility, interest rate, EMI, and approval
          will be determined after verification and lender
          assessment.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-sm font-medium text-slate-500">
          {label}
        </span>
      </div>

      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}

function getTenureMonths(tenure: string) {
  const value = parseInt(tenure, 10);

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  if (
    tenure.toLowerCase().includes("year") ||
    tenure.toLowerCase().includes("yr")
  ) {
    return value * 12;
  }

  return value;
}

function calculateEmi(
  principal: number,
  monthlyRate: number,
  months: number
) {
  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(
    1 + monthlyRate,
    months
  );

  return (
    (principal * monthlyRate * factor) /
    (factor - 1)
  );
}

