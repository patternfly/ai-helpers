import React from "react";

interface CompassHeaderProps {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  profile?: React.ReactNode;
}

export const CompassHeader: React.FunctionComponent<CompassHeaderProps> = ({
  logo,
  nav,
  profile,
}) => {
  return (
    <>
      <div className="pf-v6-c-compass__logo">{logo}</div>
      <div className="pf-v6-c-compass__nav">{nav}</div>
      <div className="pf-v6-c-compass__profile">{profile}</div>
    </>
  );
};
