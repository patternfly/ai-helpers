import React from "react";
import {
  Page,
  PageSection,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Grid,
  GridItem,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { PlusIcon } from "@patternfly/react-icons/dist/esm/icons/plus-icon";

export const CompassIntegrations: React.FunctionComponent = () => {
  const integrations = [
    {
      id: 1,
      name: "GitHub",
      description: "Connect to GitHub repositories and manage pull requests",
      status: "Connected",
      type: "Source Control",
    },
    {
      id: 2,
      name: "Slack",
      description: "Send notifications and updates to Slack channels",
      status: "Connected",
      type: "Communication",
    },
    {
      id: 3,
      name: "Jira",
      description: "Sync issues and track project progress",
      status: "Disconnected",
      type: "Project Management",
    },
    {
      id: 4,
      name: "AWS",
      description: "Deploy and manage cloud infrastructure",
      status: "Connected",
      type: "Cloud Platform",
    },
  ];

  return (
    <Page id="pf-compass-center" className="pf-m-no-sidebar">
      <PageSection>Test</PageSection>
      <PageSection>
        <div style={{ marginBottom: "1rem" }}>
          <Button variant={ButtonVariant.primary} icon={<PlusIcon />}>
            Add Integration
          </Button>
        </div>
        <Grid hasGutter>
          {integrations.map((integration) => (
            <GridItem key={integration.id} span={6}>
              <Card>
                <CardHeader>
                  <CardTitle>{integration.name}</CardTitle>
                </CardHeader>
                <CardBody>test</CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </PageSection>
    </Page>
  );
};
