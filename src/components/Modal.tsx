"use client";
import { useEffect } from "react";
import Image from "next/image"; // ✅ Import optimized Image component

interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}

const Modal = ({ imageSrc, onClose }: ModalProps) => {
  // Close the modal on pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt="Enlarged view"
          fill
          className="object-contain"
          unoptimized // ✅ Optional: remove this if you configure external domains in next.config.js
        />
        <button
          className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
