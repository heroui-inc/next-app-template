import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return <div aria-hidden className="w-6 h-6" />;

  return (
    <button
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        "inline-flex items-center justify-center",
        "w-auto h-auto bg-transparent rounded-lg text-muted",
        className,
      )}
      onClick={handleToggle}
    >
      {isLight ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </button>
  );
};
