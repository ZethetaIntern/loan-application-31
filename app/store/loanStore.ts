import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LoanType =
  | "personal"
  | "home"
  | "business"
  | "";

export interface LoanDocument {
  file: File | null;
  fileName: string;
  fileType: string;
  fileSize: number;
  previewUrl: string;
}

interface LoanFormData {
  loanType: LoanType;

  personal: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
  };

  contact: {
    email: string;
    phone: string;
  };

  address: {
    street: string;
    city: string;
    postalCode: string;
  };

  loan: {
    amount: string;
    tenure: string;
    purpose: string;
  };

  employment: {
    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    monthlyIncome: string;
    otherIncome: string;
    existingLoan: string;
    monthlyObligations: string;
  };

  personalLoan: {
    expenseType: string;
  };

  homeLoan: {
    propertyType: string;
    propertyValue: string;
    propertyLocation: string;
  };

  businessLoan: {
    businessName: string;
    businessType: string;
    annualTurnover: string;
  };

  documents: {
    identity: LoanDocument;
    income: LoanDocument;
    address: LoanDocument;
  };

  signature: string;
}

interface LoanStore {
  currentStep: number;
  formData: LoanFormData;

  setCurrentStep: (step: number) => void;

  setLoanType: (loanType: LoanType) => void;

  updatePersonal: (
    data: Partial<LoanFormData["personal"]>
  ) => void;

  updateContact: (
    data: Partial<LoanFormData["contact"]>
  ) => void;

  updateAddress: (
    data: Partial<LoanFormData["address"]>
  ) => void;

  updateLoan: (
    data: Partial<LoanFormData["loan"]>
  ) => void;

  updateEmployment: (
    data: Partial<LoanFormData["employment"]>
  ) => void;

  updatePersonalLoan: (
    data: Partial<LoanFormData["personalLoan"]>
  ) => void;

  updateHomeLoan: (
    data: Partial<LoanFormData["homeLoan"]>
  ) => void;

  updateBusinessLoan: (
    data: Partial<LoanFormData["businessLoan"]>
  ) => void;

  updateDocuments: (
    data: Partial<LoanFormData["documents"]>
  ) => void;

  setSignature: (signature: string) => void;

  resetApplication: () => void;
}

const emptyDocument: LoanDocument = {
  file: null,
  fileName: "",
  fileType: "",
  fileSize: 0,
  previewUrl: "",
};

const initialFormData: LoanFormData = {
  loanType: "",

  personal: {
    fullName: "",
    dateOfBirth: "",
    gender: "",
  },

  contact: {
    email: "",
    phone: "",
  },

  address: {
    street: "",
    city: "",
    postalCode: "",
  },

  loan: {
    amount: "",
    tenure: "",
    purpose: "",
  },

  employment: {
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    otherIncome: "",
    existingLoan: "",
    monthlyObligations: "",
  },

  personalLoan: {
    expenseType: "",
  },

  homeLoan: {
    propertyType: "",
    propertyValue: "",
    propertyLocation: "",
  },

  businessLoan: {
    businessName: "",
    businessType: "",
    annualTurnover: "",
  },

  documents: {
    identity: emptyDocument,
    income: emptyDocument,
    address: emptyDocument,
  },

  signature: "",
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      currentStep: 0,

      formData: initialFormData,

      setCurrentStep: (step) =>
        set({
          currentStep: step,
        }),

      setLoanType: (loanType) =>
        set((state) => ({
          formData: {
            ...state.formData,
            loanType,
          },
        })),

      updatePersonal: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personal: {
              ...state.formData.personal,
              ...data,
            },
          },
        })),

      updateContact: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            contact: {
              ...state.formData.contact,
              ...data,
            },
          },
        })),

      updateAddress: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            address: {
              ...state.formData.address,
              ...data,
            },
          },
        })),

      updateLoan: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            loan: {
              ...state.formData.loan,
              ...data,
            },
          },
        })),

      updateEmployment: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            employment: {
              ...state.formData.employment,
              ...data,
            },
          },
        })),

      updatePersonalLoan: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personalLoan: {
              ...state.formData.personalLoan,
              ...data,
            },
          },
        })),

      updateHomeLoan: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            homeLoan: {
              ...state.formData.homeLoan,
              ...data,
            },
          },
        })),

      updateBusinessLoan: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            businessLoan: {
              ...state.formData.businessLoan,
              ...data,
            },
          },
        })),

      updateDocuments: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            documents: {
              ...state.formData.documents,
              ...data,
            },
          },
        })),

      setSignature: (signature) =>
        set((state) => ({
          formData: {
            ...state.formData,
            signature,
          },
        })),

      resetApplication: () =>
        set({
          currentStep: 0,
          formData: initialFormData,
        }),
    }),
    {
      name: "loan-application-storage",

      partialize: (state) => ({
        currentStep: state.currentStep,

        formData: {
          ...state.formData,

          documents: {
            identity: {
              ...state.formData.documents.identity,
              file: null,
            },

            income: {
              ...state.formData.documents.income,
              file: null,
            },

            address: {
              ...state.formData.documents.address,
              file: null,
            },
          },
        },
      }),
    }
  )
);

