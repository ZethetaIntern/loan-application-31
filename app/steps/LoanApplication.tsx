"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoanStore } from "../store/loanStore";

import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import AddressDetails from "./AddressDetails";
import EmploymentDetails from "./EmploymentDetails";
import LoanDetails from "./LoanDetails";
import Documents from "./Documents";

import PreApprovalSummary from "../components/PreApprovalSummary";
import SignaturePad from "../components/SignaturePad";
import ApplicationReview from "../components/ApplicationReview";

const steps = [
  "Loan Type",
  "Personal Details",
  "Contact Details",
  "Address",
  "Employment",
  "Loan Details",
  "Documents",
  "Pre-Approval",
  "Review",
  "E-Signature",
];

export default function LoanApplication() {
  const router = useRouter();

  const currentStep = useLoanStore(
    (state) => state.currentStep
  );

  const setCurrentStep = useLoanStore(
    (state) => state.setCurrentStep
  );

  const formData = useLoanStore(
    (state) => state.formData
  );

  const personal = useLoanStore(
    (state) => state.formData.personal
  );

  const contact = useLoanStore(
    (state) => state.formData.contact
  );

  const address = useLoanStore(
    (state) => state.formData.address
  );

  const employment = useLoanStore(
    (state) => state.formData.employment
  );

  const loan = useLoanStore(
    (state) => state.formData.loan
  );

  const loanType = useLoanStore(
    (state) => state.formData.loanType
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

  const documents = useLoanStore(
    (state) => state.formData.documents
  );

  const signature = useLoanStore(
    (state) => state.formData.signature
  );

  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setIsSaved(false);

    const timer = setTimeout(() => {
      setIsSaved(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // -----------------------------
  // Personal Details Validation
  // -----------------------------
  const validatePersonalDetails = () => {
    if (personal.fullName.trim().length < 3) {
      return false;
    }

    if (!personal.dateOfBirth) {
      return false;
    }

    if (!personal.gender) {
      return false;
    }

    return true;
  };

  // -----------------------------
  // Contact Details Validation
  // -----------------------------
  const validateContactDetails = () => {
    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        contact.email.trim()
      );

    const phoneValid =
      /^[0-9+\-\s()]{10,15}$/.test(
        contact.phone.trim()
      );

    return emailValid && phoneValid;
  };

  // -----------------------------
  // Address Details Validation
  // -----------------------------
  const validateAddressDetails = () => {
    const streetValid =
      address.street.trim().length >= 5;

    const cityValid =
      address.city.trim().length >= 2;

    const postalCodeValid =
      /^[0-9]{4,6}$/.test(
        address.postalCode.trim()
      );

    return (
      streetValid &&
      cityValid &&
      postalCodeValid
    );
  };

  // -----------------------------
  // Employment Details Validation
  // -----------------------------
  const validateEmploymentDetails = () => {
    const employmentStatusValid =
      employment.employmentStatus.trim().length > 0;

    const monthlyIncomeValid =
      /^[0-9]+$/.test(
        employment.monthlyIncome.trim()
      ) &&
      Number(employment.monthlyIncome) > 0;

    return (
      employmentStatusValid &&
      monthlyIncomeValid
    );
  };

  // -----------------------------
  // Loan Details Validation
  // -----------------------------
  const validateLoanDetails = () => {
    const amount = loan.amount.trim();

    const amountValid =
      /^[0-9]+$/.test(amount) &&
      Number(amount) > 0;

    const tenureValid =
      loan.tenure.trim().length > 0;

    const purposeValid =
      loan.purpose.trim().length >= 10;

    if (
      !amountValid ||
      !tenureValid ||
      !purposeValid
    ) {
      return false;
    }

    // Personal Loan
    if (loanType === "personal") {
      const expenseTypeValid =
        personalLoan.expenseType.trim().length > 0;

      if (!expenseTypeValid) {
        return false;
      }
    }

    // Home Loan
    if (loanType === "home") {
      const propertyTypeValid =
        homeLoan.propertyType.trim().length > 0;

      const propertyValueValid =
        /^[0-9]+$/.test(
          homeLoan.propertyValue.trim()
        ) &&
        Number(homeLoan.propertyValue) > 0;

      const propertyLocationValid =
        homeLoan.propertyLocation.trim().length >= 2;

      if (
        !propertyTypeValid ||
        !propertyValueValid ||
        !propertyLocationValid
      ) {
        return false;
      }
    }

    // Business Loan
    if (loanType === "business") {
      const businessNameValid =
        businessLoan.businessName.trim().length >= 2;

      const businessTypeValid =
        businessLoan.businessType.trim().length > 0;

      const annualTurnoverValid =
        /^[0-9]+$/.test(
          businessLoan.annualTurnover.trim()
        ) &&
        Number(businessLoan.annualTurnover) > 0;

      if (
        !businessNameValid ||
        !businessTypeValid ||
        !annualTurnoverValid
      ) {
        return false;
      }
    }

    return true;
  };

  // -----------------------------
  // Documents Validation
  // -----------------------------
  const validateDocuments = () => {
    const identityValid = Boolean(
      documents.identity.file
    );

    const incomeValid = Boolean(
      documents.income.file
    );

    const addressValid = Boolean(
      documents.address.file
    );

    return (
      identityValid &&
      incomeValid &&
      addressValid
    );
  };

  // -----------------------------
  // Signature Validation
  // -----------------------------
  const validateSignature = () => {
    return Boolean(signature);
  };

  // -----------------------------
  // Continue
  // -----------------------------
  const nextStep = () => {
    // Personal Details
    if (currentStep === 1) {
      if (!validatePersonalDetails()) {
        alert(
          "Please complete all required personal details."
        );
        return;
      }
    }

    // Contact Details
    if (currentStep === 2) {
      if (!validateContactDetails()) {
        alert(
          "Please enter a valid email address and phone number."
        );
        return;
      }
    }

    // Address
    if (currentStep === 3) {
      if (!validateAddressDetails()) {
        alert(
          "Please complete all required address details."
        );
        return;
      }
    }

    // Employment
    if (currentStep === 4) {
      if (!validateEmploymentDetails()) {
        alert(
          "Please complete your Employment & Financial Details."
        );
        return;
      }
    }

    // Loan Details
    if (currentStep === 5) {
      if (!validateLoanDetails()) {
        alert(
          "Please complete all required loan details."
        );
        return;
      }
    }

    // Documents
    if (currentStep === 6) {
      if (!validateDocuments()) {
        alert(
          "Please upload all required documents before continuing."
        );
        return;
      }
    }

    // Pre-Approval Summary
    if (currentStep === 7) {
      setCurrentStep(8);
      return;
    }

    // Review
    if (currentStep === 8) {
      setCurrentStep(9);
      return;
    }

    // E-Signature
    if (currentStep === 9) {
      if (!validateSignature()) {
        alert(
          "Please provide your signature before submitting."
        );
        return;
      }

      submitApplication();
      return;
    }

    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  // -----------------------------
  // Back
  // -----------------------------
  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  // -----------------------------
  // Final Submit
  // -----------------------------
  const submitApplication = () => {
    // Personal Details
    if (!validatePersonalDetails()) {
      alert(
        "Please complete your Personal Details before submitting."
      );
      setCurrentStep(1);
      return;
    }

    // Contact Details
    if (!validateContactDetails()) {
      alert(
        "Please complete your Contact Details before submitting."
      );
      setCurrentStep(2);
      return;
    }

    // Address
    if (!validateAddressDetails()) {
      alert(
        "Please complete your Address Details before submitting."
      );
      setCurrentStep(3);
      return;
    }

    // Employment
    if (!validateEmploymentDetails()) {
      alert(
        "Please complete your Employment & Financial Details before submitting."
      );
      setCurrentStep(4);
      return;
    }

    // Loan Details
    if (!validateLoanDetails()) {
      alert(
        "Please complete your Loan Details before submitting."
      );
      setCurrentStep(5);
      return;
    }

    // Documents
    if (!validateDocuments()) {
      alert(
        "Please upload all required documents before submitting."
      );
      setCurrentStep(6);
      return;
    }

    // Signature
    if (!validateSignature()) {
      alert(
        "Please provide your signature before submitting."
      );
      setCurrentStep(9);
      return;
    }

    // Everything is valid
    router.push("/success");
  };

  // -----------------------------
  // Step Content
  // -----------------------------
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails />;

      case 2:
        return <ContactDetails />;

      case 3:
        return <AddressDetails />;

      case 4:
        return <EmploymentDetails />;

      case 5:
        return <LoanDetails />;

      case 6:
        return <Documents />;

      case 7:
        return <PreApprovalSummary />;

      case 8:
        return <ApplicationReview />;

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                E-Signature
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign below to confirm that the information
                provided in this application is accurate.
              </p>
            </div>

            <SignaturePad />
          </div>
        );

      default:
        return (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-slate-500">
              {steps[currentStep]} content will be added here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Loan Application
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Complete your application
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="text-sm text-slate-500">
            Step {currentStep + 1} of {steps.length}
          </p>

          <span
            className={`text-xs font-medium ${
              isSaved
                ? "text-green-600"
                : "text-slate-400"
            }`}
          >
            {isSaved
              ? "✓ Saved automatically"
              : "Saving..."}
          </span>
        </div>
      </div>

      {/* Responsive Progress */}
      <div className="mb-8 overflow-x-auto pb-3">
        <div className="flex min-w-[760px] items-start px-1 sm:min-w-0">
          {steps.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <div
                key={step}
                className={`flex items-start ${
                  index === steps.length - 1
                    ? "flex-none"
                    : "min-w-[76px] flex-1"
                }`}
              >
                <div className="flex min-w-[58px] flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition sm:h-10 sm:w-10 ${
                      completed || active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <span
                    className={`mt-2 max-w-[72px] text-center text-[10px] font-medium leading-4 sm:max-w-[90px] sm:text-xs ${
                      active || completed
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mt-4 h-0.5 flex-1 ${
                      index < currentStep
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {renderStepContent()}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
          {/* Back */}
          <button
            type="button"
            onClick={previousStep}
            disabled={isFirstStep}
            className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
          >
            Back
          </button>

          {/* Continue / Submit */}
          {isLastStep ? (
            <button
              type="button"
              onClick={submitApplication}
              className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 sm:px-6"
            >
              Submit Application
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 sm:px-6"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

