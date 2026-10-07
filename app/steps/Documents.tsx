"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import {
  LoanDocument,
  useLoanStore,
} from "../store/loanStore";
import { compressImage } from "../utils/compressImage";

type DocumentType = "identity" | "income" | "address";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const documentInfo: {
  type: DocumentType;
  title: string;
  description: string;
}[] = [
  {
    type: "identity",
    title: "Identity Document",
    description:
      "Upload your NID, Aadhaar or other valid identity document.",
  },
  {
    type: "income",
    title: "Income Document",
    description:
      "Upload your salary slip, income statement or similar document.",
  },
  {
    type: "address",
    title: "Address Proof",
    description:
      "Upload a utility bill or other valid address document.",
  },
];

const emptyDocument: LoanDocument = {
  file: null,
  fileName: "",
  fileType: "",
  fileSize: 0,
  previewUrl: "",
};

export default function Documents() {
  const documents = useLoanStore(
    (state) => state.formData.documents
  );

  const updateDocuments = useLoanStore(
    (state) => state.updateDocuments
  );

  const [errors, setErrors] = useState<
    Partial<Record<DocumentType, string>>
  >({});

  const [compressing, setCompressing] = useState<
    Partial<Record<DocumentType, boolean>>
  >({});

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: DocumentType
  ) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    // Allow the same file to be selected again.
    input.value = "";

    // Clear previous error.
    setErrors((previous) => ({
      ...previous,
      [type]: "",
    }));

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        [type]:
          "Invalid file type. Please upload a PDF, JPG or PNG file.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        [type]: "File size must not exceed 5 MB.",
      }));
      return;
    }

    const previousDocument = documents[type];

    if (previousDocument.previewUrl) {
      URL.revokeObjectURL(previousDocument.previewUrl);
    }

    let processedFile = file;

    // Compress images only.
    if (file.type.startsWith("image/")) {
      try {
        setCompressing((previous) => ({
          ...previous,
          [type]: true,
        }));

        processedFile = await compressImage(file);
      } catch {
        setErrors((previous) => ({
          ...previous,
          [type]:
            "Unable to process this image. Please try another image.",
        }));

        return;
      } finally {
        setCompressing((previous) => ({
          ...previous,
          [type]: false,
        }));
      }
    }

    const previewUrl = processedFile.type.startsWith("image/")
      ? URL.createObjectURL(processedFile)
      : "";

    const newDocument: LoanDocument = {
      file: processedFile,
      fileName: processedFile.name,
      fileType: processedFile.type,
      fileSize: processedFile.size,
      previewUrl,
    };

    updateDocuments({
      [type]: newDocument,
    });
  };

  const removeDocument = (type: DocumentType) => {
    const document = documents[type];

    if (document.previewUrl) {
      URL.revokeObjectURL(document.previewUrl);
    }

    updateDocuments({
      [type]: emptyDocument,
    });

    setErrors((previous) => ({
      ...previous,
      [type]: "",
    }));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Document Upload
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload the required documents to support your loan application.
        </p>
      </div>

      <div className="space-y-5">
        {documentInfo.map((item) => {
          const document = documents[item.type];
          const error = errors[item.type];
          const isCompressing = compressing[item.type];

          return (
            <div
              key={item.type}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                  <span className="ml-1 text-red-500">*</span>
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              {!document.file ? (
                <>
                  <label
                    htmlFor={`${item.type}-document`}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
                      error
                        ? "border-red-300 bg-red-50/40"
                        : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Upload size={22} />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF, JPG or PNG • Maximum 5 MB
                    </p>

                    <input
                      id={`${item.type}-document`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      className="hidden"
                      disabled={isCompressing}
                      onChange={(event) =>
                        handleFileChange(event, item.type)
                      }
                    />
                  </label>

                  {isCompressing && (
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Optimizing image...
                    </p>
                  )}

                  {error && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}
                </>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      {document.previewUrl ? (
                        <Image
                          src={document.previewUrl}
                          alt={document.fileName}
                          width={64}
                          height={64}
                          unoptimized
                          className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
                          <FileText size={28} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {document.fileName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatFileSize(document.fileSize)}
                        </p>

                        <p className="mt-1 text-xs font-medium text-green-600">
                          Document uploaded successfully
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDocument(item.type)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {document.previewUrl ? (
                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <Image
                        src={document.previewUrl}
                        alt={`${item.title} preview`}
                        width={800}
                        height={500}
                        unoptimized
                        className="max-h-72 w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <FileText
                        size={24}
                        className="text-red-500"
                      />

                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          PDF document
                        </p>

                        <p className="text-xs text-slate-500">
                          {document.fileName}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-blue-50 p-4">
        <p className="text-sm leading-6 text-blue-700">
          Images are automatically optimized before being stored.
          Accepted formats are PDF, JPG and PNG, with a maximum
          file size of 5 MB per document.
        </p>
      </div>
    </div>
  );
}

