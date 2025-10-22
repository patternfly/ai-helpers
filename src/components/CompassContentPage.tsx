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
import { CompassMainHeader } from "./lib/CompassMainHeader";
import { CompassContent } from "./lib/CompassContent";
import { CompassSection } from "./lib/CompassSection";

export const CompassContentPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <CompassMainHeader title={<Title headingLevel="h1">Title</Title>} />
      <CompassContent>
        <CompassSection>Content section</CompassSection>
      </CompassContent>
    </Fragment>
  );
};
