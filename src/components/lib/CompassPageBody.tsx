import React, { forwardRef } from "react";
import {
  PageSection,
  PageGroup,
  PageSectionProps,
} from "@patternfly/react-core";

interface CompassPageBodyProps {
  children?: React.ReactNode;
  isPlain?: boolean;
  isDashboardBody?: boolean;
  isGroup?: boolean;
  className?: string;
  pageSectionProps?: PageSectionProps;
}

export const CompassPageBody = forwardRef<HTMLDivElement, CompassPageBodyProps>(
  (
    {
      children,
      isPlain = false,
      isDashboardBody = false,
      isGroup = false,
      className,
      pageSectionProps,
    },
    ref
  ) => {
    const bodyClassName = isPlain
      ? "compass__body pf-m-plain"
      : "compass__body";

    const dashboardClassName = isDashboardBody ? " dashboard" : "";

    const combinedClassName = className
      ? `${bodyClassName}${dashboardClassName} ${className}`
      : `${bodyClassName}${dashboardClassName}`;

    return (
      <div ref={ref} className={combinedClassName}>
        {isGroup ? (
          <PageGroup>{children}</PageGroup>
        ) : (
          <PageSection {...pageSectionProps}>{children}</PageSection>
        )}
      </div>
    );
  }
);

CompassPageBody.displayName = "CompassPageBody";
