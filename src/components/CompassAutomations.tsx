import { Fragment } from "react";
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
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import { CompassAutomationTopology } from '../automationTopology/CompassAutomationTopology.tsx';

export const CompassAutomations: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Page
        id="pf-compass-center"
        className="pf-m-no-sidebar pf-m-plain"
        isContentFilled
      >
        <PageSection>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem grow={{ default: "grow" }}>
              <Title headingLevel="h1">Automations</Title>
            </FlexItem>
            <FlexItem>
              <Toolbar hasNoPadding>
                <ToolbarContent>
                  <ToolbarGroup></ToolbarGroup>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <Button icon={<EllipsisVIcon />} variant="plain" />
                    </ToolbarItem>
                  </ToolbarGroup>
                </ToolbarContent>
              </Toolbar>
            </FlexItem>
          </Flex>
        </PageSection>
        <PageSection isFilled hasBodyWrapper={false}>
          <CompassAutomationTopology />
        </PageSection>
      </Page>
    </Fragment>
  );
};
