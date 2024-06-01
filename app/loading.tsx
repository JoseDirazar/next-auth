"use client";
import { FadeLoader } from "react-spinners";

export default function Loeader() {
  return (
    <div className="h-screen w-full flex itemss-center justify-center">
      <FadeLoader color="white" />
    </div>
  );
}
