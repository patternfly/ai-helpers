import { Flex, FlexItem } from "@patternfly/react-core";
import React from "react";

interface CompassHeroProps {
  /** PF styled content. If provided, the children prop will be ignored. */
  content?: React.ReactNode;
  /** Custom hero content */
  children?: React.ReactNode;
}

export const CompassHero: React.FunctionComponent<CompassHeroProps> = ({
  children,
  content,
}) => {
  if (content !== undefined) {
    return (
      <div className="pf-v6-c-compass__hero">
        <div className="pf-v6-c-compass__hero-body">
          <Flex>
            <FlexItem grow={{ default: "grow" }}>{content}</FlexItem>
          </Flex>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-v6-c-compass__hero">
      <div className="pf-v6-c-compass__hero-body">{children}</div>
    </div>
  );
};

CompassHero.displayName = "CompassHero";
