import { Fragment, useState, useEffect, useRef } from "react";
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
import { AnimationsOverview } from "./DashboardContent/AnimationsOverview";

export const CompassDashboard: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContentDrawerOpen, setIsContentDrawerOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<
    "top" | "bottom" | "middle"
  >("top");
  const bodyRef = useRef<HTMLDivElement>(null);

  const onDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onContentDrawerToggle = () => {
    setIsContentDrawerOpen(!isContentDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll detected");

      const bodyElement = bodyRef.current;
      if (!bodyElement) return;

      const scrollTop = bodyElement.scrollTop;
      const scrollHeight = bodyElement.scrollHeight;
      const clientHeight = bodyElement.clientHeight;

      console.log("Scroll values:", { scrollTop, scrollHeight, clientHeight });

      // Check if at the top (within 10px threshold)
      if (scrollTop <= 10) {
        setScrollPosition("top");
      }
      // Check if at the bottom (within 10px threshold)
      else if (scrollTop + clientHeight >= scrollHeight - 10) {
        setScrollPosition("bottom");
      }
      // Otherwise in the middle
      else {
        setScrollPosition("middle");
      }
    };

    // Listen only to the compass__body element scroll
    const bodyElement = bodyRef.current;
    if (bodyElement) {
      bodyElement.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
      <Drawer isExpanded={isDrawerOpen}>
        <DrawerContent panelContent={drawerContent}>
          <Page
            id="pf-compass-center"
            className={`pf-m-no-sidebar pf-m-plain ${
              scrollPosition === "top"
                ? "compass_scroll-top"
                : scrollPosition === "bottom"
                ? "compass__scroll-bottom"
                : ""
            }`}
            isContentFilled
          >
            <div className="compass__toolbar">
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
                          <ToolbarItem>
                            <Button
                              icon={<BarsIcon />}
                              variant="secondary"
                              onClick={onContentDrawerToggle}
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
              </PageSection>
            </div>
            <div ref={bodyRef} className="compass__body">
              <Drawer isExpanded={isContentDrawerOpen}>
                <DrawerContent panelContent={contentDrawerContent}>
                  <PageSection
                    aria-label="Detail status events"
                    className="pf-m-plain"
                  >
                    <AnimationsOverview />
                  </PageSection>
                </DrawerContent>
              </Drawer>
            </div>
          </Page>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};
