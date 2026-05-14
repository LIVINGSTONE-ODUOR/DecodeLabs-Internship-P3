import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

export const premiumThemes = [
  { id: 'midnight-aurora', name: 'Midnight Aurora' },
  { id: 'cyber-noir', name: 'Cyber Noir' },
  { id: 'minimal-ivory', name: 'Minimal Ivory' },
  { id: 'executive-graphite', name: 'Executive Graphite' }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('stone_theme') || 'midnight-aurora');

  useEffect(() => {
    document.documentElement.classList.add('dark', 'theme-smooth');
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('stone_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const index = premiumThemes.findIndex((item) => item.id === current);
      return premiumThemes[(index + 1) % premiumThemes.length].id;
    });
  };

  const value = useMemo(
    () => ({
      theme,
      themeName: premiumThemes.find((item) => item.id === theme)?.name || 'Midnight Aurora',
      themes: premiumThemes,
      isDark: theme !== 'minimal-ivory',
      setTheme,
      toggleTheme
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
