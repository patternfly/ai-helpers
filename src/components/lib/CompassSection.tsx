import React from "react";

interface CompassSectionProps {
  children: React.ReactNode;
}

export const CompassSection: React.FunctionComponent<CompassSectionProps> = ({
  children,
}) => {
  return <div className="pf-v6-c-compass__section">{children}</div>;
};

CompassSection.displayName = "CompassSection";
