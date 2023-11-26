import { useTheme } from "./ThemeContext";
const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;