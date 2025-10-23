import React from "react";

interface CompassFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const CompassFooter: React.FunctionComponent<CompassFooterProps> = ({
  children,
  className,
}) => {
  const combinedClassName = className
    ? `compasss__footer ${className}`
    : "compasss__footer";

  return <div className={combinedClassName}>{children}</div>;
};
