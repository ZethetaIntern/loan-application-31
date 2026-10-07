"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eraser, PenLine } from "lucide-react";
import { useLoanStore } from "../store/loanStore";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 220;

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const { formData, setSignature } = useLoanStore();

  const [hasSignature, setHasSignature] = useState(
    Boolean(formData.signature)
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#0f172a";

    if (formData.signature) {
      const image = new window.Image();

      image.onload = () => {
        context.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };

      image.src = formData.signature;
    }
  }, [formData.signature]);

  const getPosition = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    const clientX =
      "touches" in event
        ? event.touches[0]?.clientX
        : event.clientX;

    const clientY =
      "touches" in event
        ? event.touches[0]?.clientY
        : event.clientY;

    return {
      x:
        ((clientX ?? 0) - rect.left) *
        (canvas.width / rect.width),

      y:
        ((clientY ?? 0) - rect.top) *
        (canvas.height / rect.height),
    };
  };

  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const { x, y } = getPosition(event);

    isDrawing.current = true;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    if (!isDrawing.current) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const { x, y } = getPosition(event);

    context.lineTo(x, y);
    context.stroke();

    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const signatureData = canvas.toDataURL("image/png");

    setSignature(signatureData);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    setSignature("");
    setHasSignature(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <PenLine className="h-5 w-5 text-blue-600" />

          <h3 className="font-semibold text-slate-900">
            Your Signature
          </h3>
        </div>

        <p className="text-sm text-slate-500">
          Draw your signature inside the box below.
        </p>
      </div>

      {/* Signature Canvas */}
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block h-auto w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Signature Status */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          {hasSignature
            ? "Signature captured successfully."
            : "Use your mouse or finger to sign."}
        </p>

        <button
          type="button"
          onClick={clearSignature}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Eraser className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Saved Signature */}
      {formData.signature && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="mb-2 text-sm font-medium text-emerald-800">
            Saved Signature
          </p>

          <div className="relative h-32 w-full rounded-lg border border-emerald-200 bg-white p-3">
            <Image
              src={formData.signature}
              alt="Saved signature"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

