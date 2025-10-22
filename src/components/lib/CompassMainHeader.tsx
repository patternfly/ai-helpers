import { Flex, FlexItem } from "@patternfly/react-core";
import React from "react";

interface CompassMainHeaderProps {
  title?: React.ReactNode;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

export const CompassMainHeader: React.FunctionComponent<
  CompassMainHeaderProps
> = ({ title, toolbar, children }) => {
  if (title !== undefined || toolbar !== undefined) {
    return (
      <div className="pf-v6-c-compass__main-header">
        <Flex alignItems={{ default: "alignItemsCenter" }}>
          <FlexItem grow={{ default: "grow" }}>{title}</FlexItem>
          <FlexItem>{toolbar}</FlexItem>
        </Flex>
      </div>
    );
  }

  return <div className="pf-v6-c-compass__main-header">{children}</div>;
};

CompassMainHeader.displayName = "CompassMainHeader";
