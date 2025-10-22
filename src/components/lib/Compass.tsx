import React from "react";
import { Drawer, DrawerContent, DrawerProps } from "@patternfly/react-core";

interface CompassProps {
  header?: React.ReactNode;
  panelStart?: React.ReactNode;
  main?: React.ReactNode;
  panelEnd?: React.ReactNode;
  footer?: React.ReactNode;
  drawerProps?: DrawerProps;
  drawerContent?: React.ReactNode;
}

// TODO: add expanded to each section
export const Compass: React.FunctionComponent<CompassProps> = ({
  header,
  panelStart,
  main,
  panelEnd,
  footer,
  drawerContent,
  drawerProps,
  ...props
}) => {
  const hasDrawer = drawerContent !== undefined;

  const compassContent = (
    <div className="pf-v6-c-compass" {...props}>
      <div className="pf-v6-c-compass__header">{header}</div>
      <div className="pf-v6-c-compass__panel pf-m-start">{panelStart}</div>
      <div className="pf-v6-c-compass__main">{main}</div>
      <div className="pf-v6-c-compass__panel pf-m-end">{panelEnd}</div>
      <div className="pf-v6-c-compass__footer">{footer}</div>
    </div>
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
