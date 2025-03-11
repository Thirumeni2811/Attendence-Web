import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "./ThemeContext"; // Import global theme context

const Mode = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <div onClick={toggleMode} className="cursor-pointer px-4">
      {mode === "light" ? <DarkModeIcon className="text-primary" /> : <LightModeIcon className="text-primary" />}
    </div>
  );
};

export default Mode;
