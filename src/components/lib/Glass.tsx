import React from "react";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Glass: React.FunctionComponent<GlassProps> = ({
  className,
  children,
  ...props
}) => {
  const combinedClassName = className ? `glass ${className}` : "glass";

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};
