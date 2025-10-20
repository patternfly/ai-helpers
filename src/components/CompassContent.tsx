import { Fragment } from "react";
import {
  Flex,
  FlexItem,
  Title,
  // Toolbar,
  // ToolbarContent,
  // ToolbarGroup,
  // ToolbarItem,
  // Button,
} from "@patternfly/react-core";
import { CompassPage } from "./lib/CompassPage";
import { CompassPageBody } from "./lib/CompassPageBody";

export const CompassContent: React.FunctionComponent = () => {
  return (
    <Fragment>
      <CompassPage
        toolbar={
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem grow={{ default: "grow" }}>
              <Title headingLevel="h1">Title</Title>
            </FlexItem>
          </Flex>
        }
        body={<CompassPageBody>Content section</CompassPageBody>}
      />
    </Fragment>
  );
};
