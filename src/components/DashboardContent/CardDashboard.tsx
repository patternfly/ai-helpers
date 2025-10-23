/* eslint-disable camelcase */
import * as React from "react";
import { Grid, GridItem, Flex, FlexItem } from "@patternfly/react-core";
import { CardHorizontalGrid } from "./CardHorizontalGrid";
import { CardStatus } from "./CardStatus";
import { CardNested } from "./CardNested";
import { RecommendationsCard } from "./RecommendationsCard";
import { CardDetailsDemo } from "./CardDetailsDemo";
import { InventoryCard } from "./InventoryCard";
import { CardEventsView } from "./CardEventsView";

export const CardDashboard: React.FunctionComponent = () => {
  return (
    <Grid hasGutter>
      <CardHorizontalGrid />
      <GridItem lg={4} xl2={6} order={{ lg: "3" }}>
        <Flex direction={{ default: "column" }}>
          <CardStatus />
          <CardNested />
          <RecommendationsCard />
        </Flex>
      </GridItem>
      <GridItem lg={4} xl2={3} order={{ lg: "2" }}>
        <Flex
          direction={{
            default: "column",
            md: "row",
            lg: "column",
          }}
        >
          <FlexItem flex={{ default: "flex_1" }}>
            <CardDetailsDemo />
          </FlexItem>
          <FlexItem flex={{ default: "flex_1" }}>
            <InventoryCard />
          </FlexItem>
        </Flex>
      </GridItem>
      <GridItem lg={4} xl2={3} order={{ lg: "4" }}>
        <Flex direction={{ default: "column" }}>
          <CardEventsView />
        </Flex>
      </GridItem>
    </Grid>
  );
};
