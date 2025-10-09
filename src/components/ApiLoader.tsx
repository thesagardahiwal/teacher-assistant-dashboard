// app/components/ui/ApiLoader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface ApiLoaderProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export default function ApiLoader({ loading, error, children }: ApiLoaderProps) {
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {/* 🔵 Top Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-blue-500 animate-pulse" />
      )}

      {/* ❌ Error Toast */}
      {showError && error && (
        <div className="fixed top-5 right-5 z-50 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-lg flex items-start space-x-3 max-w-sm">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button onClick={() => setShowError(false)} aria-label="Close error toast">
            <X className="h-4 w-4 text-red-500 hover:text-red-700 transition" />
          </button>
        </div>
      )}

      {/* ✅ Main Content */}
      <>{children}</>
    </>
  );
}
