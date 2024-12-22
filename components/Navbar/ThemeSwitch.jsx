import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

const btnStyles =
  "text-lg cursor-pointer text-secondary-foreground hover:text-primary";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <li>
          <MdOutlineLightMode
            className={btnStyles}
            onClick={() => {
              setTheme("light");
            }}
          />
        </li>
      ) : (
        <li>
          <MdDarkMode
            className={btnStyles}
            onClick={() => {
              setTheme("dark");
            }}
          />
        </li>
      )}
    </>
  );
};

export default ThemeSwitch;
