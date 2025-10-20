import { Fragment, useEffect, useRef } from "react";
import {
  Button,
  ActionListItem,
  Content,
  ActionList,
} from "@patternfly/react-core";
import { AnimationsOverview } from "./DashboardContent/AnimationsOverview";
import { CompassPage } from "./lib/CompassPage";
import { CompassPageBody } from "./lib/CompassPageBody";

export const CompassDashboard: React.FunctionComponent = () => {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Remove if we decide to not use the feathered opacity scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const bodyElement = bodyRef.current;
      if (!bodyElement) return;

      const scrollTop = bodyElement.scrollTop;
      const scrollHeight = bodyElement.scrollHeight;
      const clientHeight = bodyElement.clientHeight;
      console.log("scrolling", scrollTop);

      // Check if at the top (within 20px threshold)
      if (scrollTop <= 20) {
        bodyElement.style.setProperty(
          "--compass__scroll-top",
          scrollTop.toString()
        );
      }
      // Check if at the bottom (within 20px threshold)
      else if (scrollTop + clientHeight >= scrollHeight - 20) {
        bodyElement.style.setProperty(
          "--compass__scroll-bottom",
          (scrollHeight - (scrollTop + clientHeight)).toString()
        );
      } else {
        bodyElement.style.setProperty("--compass__scroll-bottom", "20");
        bodyElement.style.setProperty("--compass__scroll-top", "20");
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

  return (
    <Fragment>
      <CompassPage
        hero={
          <Content>
            <h1>Automation that does more</h1>
            <p>
              Red Hat Ansible Automation Platform offers more capabilities,
              accessibility, and flexibility, so you can bring the power of
              automation to the teams, tasks, and environments that need it. 
            </p>
            <ActionList>
              <ActionListItem>
                <Button variant="primary">Upgrade today</Button>
              </ActionListItem>
              <ActionListItem>
                <Button variant="secondary">Talk to a Red Hatter</Button>
              </ActionListItem>
            </ActionList>
          </Content>
        }
        body={
          <CompassPageBody
            ref={bodyRef}
            isPlain
            isDashboardBody
            pageSectionProps={{
              "aria-label": "Detail status events",
              className: "pf-m-plain",
            }}
          >
            <AnimationsOverview />
          </CompassPageBody>
        }
      />
    </Fragment>
  );
};
