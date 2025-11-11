"use client";

import { Search, UserCircle2, Menu } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export function Navbar({ onMenuToggle, isMobileMenuOpen }: NavbarProps) {
  return (
    <header className="relative">
      <FloatingMenuButton onMenuToggle={onMenuToggle} />
    </header>
  );
}

function SearchBar() {
  return (
    <div className="relative w-full md:w-72 mx-2 md:mx-0">
      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  return (
    <Link href="/dashboard/profile" className="flex items-center space-x-3">
      <UserCircle2 className="w-8 h-8 text-blue-600" />
      <span className="hidden sm:inline font-medium text-gray-700">
        {user?.name || "Failed to load!"}
      </span>
    </Link>
  );
}

/* -----------------------------------------------------------
   🧭 Floating Menu Button (Mobile only, draggable)
----------------------------------------------------------- */
function FloatingMenuButton({ onMenuToggle }: { onMenuToggle: () => void }) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Default position: bottom-right
  useEffect(() => {
    if (window.innerWidth < 768) {
      const x = window.innerWidth - 80;
      const y = window.innerHeight - 100;
      setPosition({ x, y });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    setDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const x = e.clientX - offset.x;
    const y = e.clientY - offset.y;
    setPosition({ x, y });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (!dragging) onMenuToggle();
      }}
      className="md:hidden fixed z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none",
      }}
      aria-label="Floating Menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
