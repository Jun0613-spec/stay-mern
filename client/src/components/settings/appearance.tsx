import { SystemMode } from "./system-mode";
import { DarkMode } from "./dark-mode";
import { LightMode } from "./light-mode";

import { useTheme } from "../providers/theme-provider";

import { cn } from "@/lib/utils";

const Appearance = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="w-full px-4 pt-5">
      <h5 className="text-2xl font-semibold mb-1">Appearance</h5>
      <p className="text-sm font-normal">Pick themes</p>

      <div className="mt-4 w-full">
        <div
          className="flex flex-col items-start
               gap-5 sm:flex-row
              "
        >
          {/* {LightMode} */}
          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <button
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "light" && "border-primary"
              )}
              onClick={() => setTheme("light")}
            >
              <LightMode />
            </button>
            <p className="mt-2 text-center">Light mode</p>
          </div>

          {/* {DarkMode} */}

          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <button
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "dark" && "border-primary"
              )}
              onClick={() => setTheme("dark")}
            >
              <DarkMode />
            </button>
            <p className="mt-2 text-center">Dark mode</p>
          </div>

          {/* {SystemMode} */}

          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <button
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "system" && "border-primary"
              )}
              onClick={() => setTheme("system")}
            >
              <SystemMode />
            </button>
            <p className="mt-2 text-center">System mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
