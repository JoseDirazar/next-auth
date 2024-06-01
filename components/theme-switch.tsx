"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
/*   const { theme, toggleTheme } = useTheme(); */
  const { setTheme, resolvedTheme } = useTheme()

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4">
      {resolvedTheme === "light" ? (
      <button
        className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border-[2px] border-black border-opacity-40 bg-black text-white antialiased shadow-2xl backdrop-blur-[0.5rem] transition-all sm:hover:scale-[1.15] active:scale-110 dark:bg-white"
        onClick={() => setTheme("dark")}
      >
          <MoonIcon className="rounded-full bg-black text-xl font-bold text-white" />
      </button>
        ) : (
          <button
        className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border-[2px] border-black border-opacity-40 bg-black text-white antialiased shadow-2xl backdrop-blur-[0.5rem] transition-all sm:hover:scale-[1.15] active:scale-110 dark:bg-white"
        onClick={() => setTheme("light")}
      >
          <SunIcon className="text-xl dark:bg-white dark:text-black" />
          </button>
        )}
    </div>
  );
};

export default ThemeSwitch;
