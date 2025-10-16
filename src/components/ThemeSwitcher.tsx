import { Fragment, useState, useEffect } from "react";
import { Flex, Switch } from "@patternfly/react-core";

export const ThemeSwitcher: React.FunctionComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isNoGlassTheme, setNoGlassTheme] = useState(true);
  const [isRedBackground, setIsRedBackground] = useState(false);

  useEffect(() => {
    // Check if dark theme is already applied
    const htmlElement = document.documentElement;
    const hasDarkClass = htmlElement.classList.contains("pf-v6-theme-dark");
    const hasNoGlass = htmlElement.classList.contains("no-glass");
    const hasRedClass = htmlElement.classList.contains("pf-background-red");
    setIsDarkTheme(hasDarkClass);
    setNoGlassTheme(hasNoGlass);
    setIsRedBackground(hasRedClass);
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

  const handleRedToggle = (
    _evt: React.FormEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const htmlElement = document.documentElement;

    if (checked) {
      htmlElement.classList.add("pf-background-red");
    } else {
      htmlElement.classList.remove("pf-background-red");
    }

    setIsRedBackground(checked);
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
        <Flex gap={{ default: "gapSm" }}>
          <Switch
            id="theme-switcher"
            label="Dark theme"
            isChecked={isDarkTheme}
            onChange={handleThemeToggle}
          />
          <Switch
            id="no-glass-switcher"
            label="Glass"
            isChecked={!isNoGlassTheme}
            onChange={(evt, checked) => handleNoGlassToggle(evt, !checked)}
          />
          <Switch
            id="red-toggle"
            label="Red"
            isChecked={isRedBackground}
            onChange={handleRedToggle}
          />
        </Flex>
      </div>
    </Fragment>
  );
};
