import { Drawer, DrawerContent, DrawerProps } from "@patternfly/react-core";
import React from "react";

interface CompassContentProps {
  children: React.ReactNode;
  drawerProps?: DrawerProps;
  drawerContent?: React.ReactNode;
}

export const CompassContent: React.FunctionComponent<CompassContentProps> = ({
  children,
  drawerProps,
  drawerContent,
}) => {
  const hasDrawer = drawerContent !== undefined;

  const compassContent = (
    <div className="pf-v6-c-compass__content">{children}</div>
  );

  if (hasDrawer) {
    return (
      <Drawer {...drawerProps}>
        <DrawerContent panelContent={drawerContent}>
          {compassContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return compassContent;
};

CompassContent.displayName = "CompassContent";
