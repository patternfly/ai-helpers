import React from "react";
import { Card, CardProps } from "@patternfly/react-core";

interface GlassCardProps extends Omit<CardProps, "className"> {
  className?: string;
}

export const GlassCard: React.FunctionComponent<GlassCardProps> = ({
  className,
  ...props
}) => {
  const combinedClassName = className ? `glass ${className}` : "glass";

  return <Card className={combinedClassName} {...props} />;
};
