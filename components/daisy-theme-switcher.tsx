"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter"
];

export function DaisyThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="skeleton w-32 h-10"></div>;
  }

  return (
    <div className="dropdown dropdown-top dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        🎨 Tema
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 overflow-y-auto">
        {themes.map((themeName) => (
          <li key={themeName}>
            <button
              onClick={() => setTheme(themeName)}
              className={`${theme === themeName ? 'active' : ''}`}
            >
              <span className="capitalize">{themeName}</span>
              {theme === themeName && <span className="text-primary">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}