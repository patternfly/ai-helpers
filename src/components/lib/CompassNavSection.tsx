import React from "react";

interface CompassNavSectionProps {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  user?: React.ReactNode;
}

export const CompassNavSection: React.FunctionComponent<
  CompassNavSectionProps
> = ({ logo, nav, user }) => {
  return (
    <>
      {logo && <div id="brand-logo">{logo}</div>}
      {nav && (
        <div id="navigation" className="compass__nav">
          {nav}
        </div>
      )}
      {user && (
        <div id="user-menu" className="compass__user">
          {user}
        </div>
      )}
    </>
  );
};
