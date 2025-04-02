import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/components/providers/theme-provider";

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-sm">
      <button
        className="border dark:border-neutral-600 rounded-md p-1.5 flex items-center justify-center cursor-pointer hover:opacity-80"
        onClick={toggleDropdown}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-32 bg-white dark:bg-neutral-800 shadow-lg rounded-md z-10 border dark:border-neutral-600"
        >
          <div
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className="cursor-pointer text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 rounded-t-md"
          >
            Light
          </div>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-600" />

          <div
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className="cursor-pointer text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2"
          >
            Dark
          </div>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-600" />

          <div
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className="cursor-pointer text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 rounded-b-md"
          >
            System
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
