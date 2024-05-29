"use client";

import { logout } from "@/utils/db";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span
      onClick={onClick}
      className="cursor-pointer rounded-3xl bg-neutral-900 border border-neutral-500 flex items-center justify-center px-3 py-2 hover:scale-105 transition-transform"
    >
      {children}
    </span>
  );
};
