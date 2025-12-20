const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <input
      type="checkbox"
      className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800 ml-4"
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;
