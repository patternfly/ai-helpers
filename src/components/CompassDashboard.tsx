import { Fragment, useState } from "react";
import {
  Page,
  PageSection,
  Flex,
  FlexItem,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Button,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Content,
  DrawerPanelBody,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";

export const CompassDashboard: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContentDrawerOpen, setIsContentDrawerOpen] = useState(false);

  const onDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onContentDrawerToggle = () => {
    setIsContentDrawerOpen(!isContentDrawerOpen);
  };

  const drawerContent = (
    <>
      <DrawerHead>
        <span>Dashboard Details</span>
        <DrawerActions>
          <DrawerCloseButton onClick={onDrawerToggle} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Content component="h3">Dashboard Information</Content>
        <Content component="p">
          This drawer contains additional dashboard details and controls.
        </Content>
        <Content component="p">
          You can add charts, metrics, or other dashboard components here.
        </Content>
      </DrawerPanelBody>
    </>
  );

  const contentDrawerContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <span>Content Details</span>
        <DrawerActions>
          <DrawerCloseButton onClick={onContentDrawerToggle} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Content component="h3">Content Information</Content>
        <Content component="p">
          This drawer contains detailed information about the dashboard content.
        </Content>
        <Content component="p">
          You can add filters, settings, or other content controls here.
        </Content>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Page
        id="pf-compass-center"
        className="pf-m-no-sidebar pf-m-plain"
        isContentFilled
        notificationDrawer={drawerContent}
        isNotificationDrawerExpanded={isDrawerOpen}
      >
        <PageSection>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem grow={{ default: "grow" }}>
              <Title headingLevel="h1">Dashboard</Title>
            </FlexItem>
            <FlexItem>
              <Toolbar hasNoPadding>
                <ToolbarContent>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <Button
                        icon={<BarsIcon />}
                        variant="plain"
                        onClick={onDrawerToggle}
                        aria-label="Toggle drawer"
                      >
                        Details
                      </Button>
                    </ToolbarItem>
                  </ToolbarGroup>
                </ToolbarContent>
              </Toolbar>
            </FlexItem>
          </Flex>
        </PageSection>
        <Drawer isExpanded={isContentDrawerOpen}>
          <DrawerContent panelContent={contentDrawerContent}>
            <DrawerContentBody>
              <PageSection>
                <Flex alignItems={{ default: "alignItemsCenter" }}>
                  <FlexItem grow={{ default: "grow" }}>
                    <Content component="h2">Dashboard Content</Content>
                  </FlexItem>
                  <FlexItem>
                    <Button
                      icon={<BarsIcon />}
                      variant="secondary"
                      onClick={onContentDrawerToggle}
                      aria-label="Toggle content drawer"
                    >
                      Content Details
                    </Button>
                  </FlexItem>
                </Flex>
                <div style={{ marginTop: "1rem" }}>
                  <Content component="p">
                    This is the main dashboard content area. You can add charts,
                    metrics, tables, or any other dashboard components here.
                  </Content>
                </div>
              </PageSection>
            </DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </Page>
    </Fragment>
  );
};
