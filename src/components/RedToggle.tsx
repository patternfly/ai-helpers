import { Fragment, useState, useEffect } from "react";
import { Checkbox } from "@patternfly/react-core";

export const RedToggle: React.FunctionComponent = () => {
  const [isRedBackground, setIsRedBackground] = useState(false);

  useEffect(() => {
    // Check if red background is already applied
    const htmlElement = document.documentElement;
    const hasRedClass = htmlElement.classList.contains("pf-background-red");
    setIsRedBackground(hasRedClass);
  }, []);

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
          bottom: "60px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <Checkbox
          id="red-toggle"
          label="Red"
          isChecked={isRedBackground}
          onChange={handleRedToggle}
        />
      </div>
    </Fragment>
  );
};
