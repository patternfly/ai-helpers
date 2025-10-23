import React from "react";
import { Button, ButtonProps } from "@patternfly/react-core";

interface CompassAIButtonProps extends Omit<ButtonProps, "className"> {
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CompassAIButton: React.FunctionComponent<CompassAIButtonProps> = ({
  icon,
  className,
  ...buttonProps
}) => {
  const combinedClassName = className
    ? `pf-v6-c-compass__sparkle ai-border ${className}`
    : "pf-v6-c-compass__sparkle ai-border";

  return (
    <Button
      {...buttonProps}
      className={combinedClassName}
      variant="plain"
      icon={icon}
    />
  );
};
