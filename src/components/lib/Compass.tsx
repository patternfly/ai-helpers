import React from "react";

interface CompassProps {
  north?: React.ReactNode;
  east?: React.ReactNode;
  south?: React.ReactNode;
  west?: React.ReactNode;
  center?: React.ReactNode;
}

// TODO: add expanded to each section
export const Compass: React.FunctionComponent<CompassProps> = ({
  north,
  east,
  south,
  west,
  center,
}) => {
  return (
    <div id="pf-compass" className="compass">
      {north && (
        <div id="pf-compass__north" className="compass__header">
          {north}
        </div>
      )}
      {west && (
        <div id="pf-compass__west" className="compass__panel--start">
          {west}
        </div>
      )}
      {center && (
        <div id="pf-compass__main" className="compass__main">
          {center}
        </div>
      )}
      {east && (
        <div id="pf-compass__east" className="compass__panel--end">
          {east}
        </div>
      )}
      {south && (
        <div id="pf-compass__south" className="compass__footer">
          {south}
        </div>
      )}
    </div>
  );
};
