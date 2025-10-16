import { Fragment, useState, useEffect } from "react";
import { Flex, Switch } from "@patternfly/react-core";

export const ThemeSwitcher: React.FunctionComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isNoGlassTheme, setNoGlassTheme] = useState(true);

  useEffect(() => {
    // Check if dark theme is already applied
    const htmlElement = document.documentElement;
    const hasDarkClass = htmlElement.classList.contains("pf-v6-theme-dark");
    const hasNoGlass = htmlElement.classList.contains("no-glass");
    setIsDarkTheme(hasDarkClass);
    setNoGlassTheme(hasNoGlass);
  }, []);

  const handleThemeToggle = (
    _evt: React.FormEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const htmlElement = document.documentElement;

    if (checked) {
      htmlElement.classList.add("pf-v6-theme-dark");
    } else {
      htmlElement.classList.remove("pf-v6-theme-dark");
    }

    setIsDarkTheme(checked);
  };

  const handleNoGlassToggle = (
    _evt: React.FormEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const htmlElement = document.documentElement;

    if (checked) {
      htmlElement.classList.add("no-glass");
    } else {
      htmlElement.classList.remove("no-glass");
    }

    setNoGlassTheme(checked);
  };

  return (
    <Fragment>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Flex>
          <Switch
            id="theme-switcher"
            label="Dark theme"
            isChecked={isDarkTheme}
            onChange={handleThemeToggle}
          />
          <Switch
            id="no-glass-switcher"
            label="No glass"
            isChecked={isNoGlassTheme}
            onChange={handleNoGlassToggle}
          />
        </Flex>
      </div>
    </Fragment>
  );
};
