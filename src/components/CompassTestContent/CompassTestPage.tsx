import { Fragment, useState } from "react";
import {
  Title,
  Drawer,
  DrawerPanelBody,
  DrawerPanelContent,
  DrawerHead,
  DrawerContent,
  DrawerActions,
  DrawerCloseButton,
  Content,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import { TestReactFlow } from "./TestReactFlow";
import {
  ContentDrawerProvider,
  useContentDrawer,
} from "./ContentDrawerContext";
import { CompassContent } from "../lib/CompassContent";
import { CompassMainHeader } from "../lib/CompassMainHeader";
import { CompassSection } from "../lib/CompassSection";

const CompassTestPageContent: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isContentDrawerOpen, toggleContentDrawer } = useContentDrawer();

  const onDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerContent = (
    <DrawerPanelContent>
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
    </DrawerPanelContent>
  );

  const contentDrawerContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <span>Content Details</span>
        <DrawerActions>
          <DrawerCloseButton onClick={toggleContentDrawer} />
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
      <Drawer isExpanded={isDrawerOpen}>
        <DrawerContent panelContent={drawerContent}>
          <CompassMainHeader
            title={<Title headingLevel="h1">Title</Title>}
            toolbar={
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
                    <ToolbarItem>
                      <Button
                        icon={<BarsIcon />}
                        variant="secondary"
                        onClick={toggleContentDrawer}
                        aria-label="Toggle content drawer"
                      >
                        Content Details
                      </Button>
                    </ToolbarItem>
                  </ToolbarGroup>
                </ToolbarContent>
              </Toolbar>
            }
          />
          <Drawer isExpanded={isContentDrawerOpen}>
            <DrawerContent panelContent={contentDrawerContent}>
              <CompassContent>
                <CompassSection>
                  <TestReactFlow />
                </CompassSection>
              </CompassContent>
            </DrawerContent>
          </Drawer>
          {/* <CompassPage
            toolbar={
              <Flex alignItems={{ default: "alignItemsCenter" }}>
                <FlexItem grow={{ default: "grow" }}>
                  <Title headingLevel="h1">Title</Title>
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
                        <ToolbarItem>
                          <Button
                            icon={<BarsIcon />}
                            variant="secondary"
                            onClick={toggleContentDrawer}
                            aria-label="Toggle content drawer"
                          >
                            Content Details
                          </Button>
                        </ToolbarItem>
                      </ToolbarGroup>
                    </ToolbarContent>
                  </Toolbar>
                </FlexItem>
              </Flex>
            }
            body={
              <Drawer isExpanded={isContentDrawerOpen}>
                <DrawerContent panelContent={contentDrawerContent}>
                  <CompassPageBody pageSectionProps={{ hasBodyWrapper: false }}>
                    <TestReactFlow />
                  </CompassPageBody>
                </DrawerContent>
              </Drawer>
            }
          /> */}
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export const CompassTestPage: React.FunctionComponent = () => {
  return (
    <ContentDrawerProvider>
      <CompassTestPageContent />
    </ContentDrawerProvider>
  );
};
