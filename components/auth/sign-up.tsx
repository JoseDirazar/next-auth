"use client";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/utils/db";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  ArrowRightIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RegisterForm() {
  const [errorMessage, dispatch] = useFormState(register, undefined);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState('password')
  function submitAction(payload: FormData) {
    dispatch(payload);
    router.push("/sign-in");
  }
  return (
    <form action={submitAction} className="container max-w-sm flex items-center justify-center">
      <div className="rounded-lg bg-slate-950 shadow-2xl shadow-violet-950 px-6 pb-4 pt-8 flex flex-col items-center justify-center">
        <h1 className={`mb-3 text-2xl`}>Please register to continue</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-neutral-400"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer bg-slate-900 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-neutral-400" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-neutral-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer bg-slate-900 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-neutral-400" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-neutral-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer bg-slate-900 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={showPassword}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-neutral-400" />
              <button type="button" className="absolute h-[18px] w-[18px] top-1/2 right-3 -translate-y-1/2 text-gray-500 peer-focus:text-neutral-400" onClick={() => showPassword === 'password' ? setShowPassword('text') : setShowPassword('password')}>
              {showPassword !== 'password' ? <EyeIcon  /> : <EyeSlashIcon />}
              </button>
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      <p>Have an account? <Link href="/sign-in" className="text-blue-600 hover:underline">Sign in</Link></p>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-8 bg-slate-700 rounded-lg px-5 py-3 flex items-center justify-center" aria-disabled={pending}>
      Register{" "}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
