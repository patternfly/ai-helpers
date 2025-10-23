import React from "react";
import { ActionList, ActionListProps } from "@patternfly/react-core";

interface VerticalActionListProps extends Omit<ActionListProps, "className"> {
  className?: string;
}

export const VerticalActionList: React.FunctionComponent<
  VerticalActionListProps
> = ({ className, ...props }) => {
  const combinedClassName = className
    ? `pf-m-vertical ${className}`
    : "pf-m-vertical";

  return <ActionList className={combinedClassName} {...props} />;
};
