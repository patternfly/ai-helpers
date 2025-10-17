import { Fragment } from "react";
import {
  Page,
  PageSection,
  Flex,
  FlexItem,
  Title,
} from "@patternfly/react-core";

export const CompassTestPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Page
        id="pf-compass-center"
        className="pf-m-no-sidebar pf-m-plain"
        isContentFilled
      >
        <div className="compass__toolbar">
          <PageSection>
            <Flex alignItems={{ default: "alignItemsCenter" }}>
              <FlexItem grow={{ default: "grow" }}>
                <Title headingLevel="h1">Title</Title>
              </FlexItem>
            </Flex>
          </PageSection>
        </div>
        <div className="compass__body">
          <PageSection>Content section</PageSection>
        </div>
      </Page>
    </Fragment>
  );
};
