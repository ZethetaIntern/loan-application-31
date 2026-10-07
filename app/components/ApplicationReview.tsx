"use client";

import Image from "next/image";
import {
  CheckCircle2,
  FileText,
  User,
  Wallet,
  MapPin,
  BriefcaseBusiness,
  PenLine,
} from "lucide-react";
import { useLoanStore } from "../store/loanStore";

export default function ApplicationReview() {
  const formData = useLoanStore((state) => state.formData);

  const {
    loanType,
    personal,
    contact,
    address,
    employment,
    loan,
    personalLoan,
    homeLoan,
    businessLoan,
    documents,
    signature,
  } = formData;

  const loanTypeLabel =
    loanType === "personal"
      ? "Personal Loan"
      : loanType === "home"
      ? "Home Loan"
      : loanType === "business"
      ? "Business Loan"
      : "Not selected";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600" />

          <h2 className="text-2xl font-bold text-slate-900">
            Review Your Application
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Please review your information carefully before
          submitting your loan application.
        </p>
      </div>

      {/* Loan Information */}
      <ReviewSection
        icon={<Wallet className="h-5 w-5" />}
        title="Loan Information"
      >
        <ReviewRow
          label="Loan Type"
          value={loanTypeLabel}
        />

        <ReviewRow
          label="Requested Amount"
          value={loan.amount}
        />

        <ReviewRow
          label="Tenure"
          value={loan.tenure}
        />

        <ReviewRow
          label="Purpose"
          value={loan.purpose}
        />
      </ReviewSection>

      {/* Personal Details */}
      <ReviewSection
        icon={<User className="h-5 w-5" />}
        title="Personal Details"
      >
        <ReviewRow
          label="Full Name"
          value={personal.fullName}
        />

        <ReviewRow
          label="Date of Birth"
          value={personal.dateOfBirth}
        />

        <ReviewRow
          label="Gender"
          value={personal.gender}
        />
      </ReviewSection>

      {/* Contact & Address */}
      <ReviewSection
        icon={<MapPin className="h-5 w-5" />}
        title="Contact & Address"
      >
        <ReviewRow
          label="Email"
          value={contact.email}
        />

        <ReviewRow
          label="Phone"
          value={contact.phone}
        />

        <ReviewRow
          label="Street"
          value={address.street}
        />

        <ReviewRow
          label="City"
          value={address.city}
        />

        <ReviewRow
          label="Postal Code"
          value={address.postalCode}
        />
      </ReviewSection>

      {/* Employment */}
      <ReviewSection
        icon={<BriefcaseBusiness className="h-5 w-5" />}
        title="Employment & Financial Details"
      >
        <ReviewRow
          label="Employment Status"
          value={employment.employmentStatus}
        />

        <ReviewRow
          label="Employer"
          value={employment.employerName}
        />

        <ReviewRow
          label="Job Title"
          value={employment.jobTitle}
        />

        <ReviewRow
          label="Monthly Income"
          value={employment.monthlyIncome}
        />

        <ReviewRow
          label="Other Income"
          value={employment.otherIncome}
        />

        <ReviewRow
          label="Existing Loan"
          value={employment.existingLoan}
        />

        <ReviewRow
          label="Monthly Obligations"
          value={employment.monthlyObligations}
        />
      </ReviewSection>

      {/* Personal Loan */}
      {loanType === "personal" && (
        <ReviewSection
          icon={<FileText className="h-5 w-5" />}
          title="Personal Loan Details"
        >
          <ReviewRow
            label="Expense Type"
            value={personalLoan.expenseType}
          />
        </ReviewSection>
      )}

      {/* Home Loan */}
      {loanType === "home" && (
        <ReviewSection
          icon={<FileText className="h-5 w-5" />}
          title="Home Loan Details"
        >
          <ReviewRow
            label="Property Type"
            value={homeLoan.propertyType}
          />

          <ReviewRow
            label="Property Value"
            value={homeLoan.propertyValue}
          />

          <ReviewRow
            label="Property Location"
            value={homeLoan.propertyLocation}
          />
        </ReviewSection>
      )}

      {/* Business Loan */}
      {loanType === "business" && (
        <ReviewSection
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          title="Business Loan Details"
        >
          <ReviewRow
            label="Business Name"
            value={businessLoan.businessName}
          />

          <ReviewRow
            label="Business Type"
            value={businessLoan.businessType}
          />

          <ReviewRow
            label="Annual Turnover"
            value={businessLoan.annualTurnover}
          />
        </ReviewSection>
      )}

      {/* Documents */}
      <ReviewSection
        icon={<FileText className="h-5 w-5" />}
        title="Documents"
      >
        <DocumentStatus
          label="Identity Document"
          uploaded={Boolean(documents.identity.file)}
          fileName={documents.identity.fileName}
        />

        <DocumentStatus
          label="Income Document"
          uploaded={Boolean(documents.income.file)}
          fileName={documents.income.fileName}
        />

        <DocumentStatus
          label="Address Document"
          uploaded={Boolean(documents.address.file)}
          fileName={documents.address.fileName}
        />
      </ReviewSection>

      {/* Signature */}
      <ReviewSection
        icon={<PenLine className="h-5 w-5" />}
        title="E-Signature"
      >
        {signature ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Signature provided
            </div>

            <div className="relative h-28 w-full rounded-lg border border-slate-200 bg-white p-3">
              <Image
                src={signature}
                alt="Applicant signature"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-600">
            Signature not provided.
          </p>
        )}
      </ReviewSection>
    </div>
  );
}

function ReviewSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 flex items-center gap-2 text-slate-800">
        <span className="text-blue-600">
          {icon}
        </span>

        <h3 className="font-semibold">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-900 sm:text-right">
        {value || "Not provided"}
      </span>
    </div>
  );
}

function DocumentStatus({
  label,
  uploaded,
  fileName,
}: {
  label: string;
  uploaded: boolean;
  fileName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-3">
      <div>
        <p className="text-sm font-medium text-slate-800">
          {label}
        </p>

        {uploaded && fileName && (
          <p className="mt-1 max-w-[250px] truncate text-xs text-slate-500">
            {fileName}
          </p>
        )}
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          uploaded
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {uploaded ? "Uploaded" : "Missing"}
      </span>
    </div>
  );
}

