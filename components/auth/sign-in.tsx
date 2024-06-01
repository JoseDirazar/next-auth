"use client";
import { lusitana } from "@/lib/fonts";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/utils/db";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="container max-w-sm">
      <div className="rounded-lg flex flex-col items-center  bg-slate-950 shadow-violet-950 shadow-lg justify-between py-12">
        <div className="">
          <p className={`${lusitana.className} mb-3 text-2xl`}>Sign In</p>
        </div>
        <div className="w-fit">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-slate-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border focus:border-gray-50 py-[9px] pl-10 bg-black text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-50" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-slate-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border focus:border-gray-50 py-[9px] pl-10 bg-black text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-50" />
            </div>
          </div>
        </div>
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
        <LoginButton />
      </div>
      <p className="text-white mt-5 text-center">
        Dont have an account?{" "}
        <Link href="/sign-up" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group bg-slate-950 flex items-center justify-center px-6 py-3 border border-slate-500 hover:scale-105 transition-transform hover:bg-slate-800 ease-in-out rounded-3xl"
      aria-disabled={pending}
    >
      Log in{" "}
      <ArrowRightIcon className="inline-block ml-2 h-5 w-5 text-gray-50 " />
    </button>
  );
}
