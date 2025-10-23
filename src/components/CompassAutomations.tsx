import { Fragment } from "react";
import {
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Button,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import { CompassAutomationTopology } from "../automationTopology/CompassAutomationTopology.tsx";
import { CompassMainHeader } from "./lib/CompassMainHeader.tsx";
import { CompassContent } from "./lib/CompassContent.tsx";
import { CompassSection } from "./lib/CompassSection.tsx";

export const CompassAutomations: React.FunctionComponent = () => {
  return (
    <Fragment>
      <CompassMainHeader
        title={<Title headingLevel="h1">Automations</Title>}
        toolbar={
          <Toolbar hasNoPadding>
            <ToolbarContent>
              <ToolbarGroup>
                <ToolbarItem>
                  <Button icon={<EllipsisVIcon />} variant="plain" />
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
        }
      />
      <CompassContent>
        <CompassSection>
          <CompassAutomationTopology />
        </CompassSection>
      </CompassContent>
      {/* <CompassPage
        toolbar={
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
        }
        body={
          <CompassPageBody
            pageSectionProps={{ isFilled: true, hasBodyWrapper: false }}
          >
            <CompassAutomationTopology />
          </CompassPageBody>
        }
      /> */}
    </Fragment>
  );
};
