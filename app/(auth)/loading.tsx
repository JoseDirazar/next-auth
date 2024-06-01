"use client";
import { FadeLoader } from "react-spinners";

export default function Loeader() {
  return (
    <div className="h-screen min-w-full flex items-center justify-center">
      <FadeLoader color="white" />
    </div>
  );
}
