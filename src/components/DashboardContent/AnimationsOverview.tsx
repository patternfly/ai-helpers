import { Fragment, FunctionComponent } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Grid,
  GridItem,
  Title,
  Flex,
  Dropdown,
  MenuToggle,
  MenuToggleElement,
  ProgressStepper,
  ProgressStep,
  Spinner,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import AnimationsOverviewClusterInventory from "./AnimationsOverviewClusterInventory.tsx";
import AnimationsOverviewNetworkActivity from "./AnimationsOverviewNetworkActivity.tsx";
import AnimationsOverviewStorage from "./AnimationsOverviewStorage.tsx";
import AnimationsOverviewMemoryUtilization from "./AnimationsOverviewMemoryUtilization.tsx";
import { Glass } from "../lib/Glass";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import PortIcon from "@patternfly/react-icons/dist/esm/icons/port-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import ResourcesFullIcon from "@patternfly/react-icons/dist/esm/icons/resources-full-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";

const activityData = [
  {
    id: 1,
    name: "my-pod-name",
    project: "project-test",
    progress: ["success", "success", "success"],
  },
  {
    id: 2,
    name: "my-pod-name",
    project: "project-test",
    progress: ["success", "pending", "default"],
  },
  {
    id: 3,
    name: "my-pod-name",
    project: "project-test",
    progress: ["success", "success", "danger"],
  },
  {
    id: 4,
    name: "my-pod-name",
    project: "project-test",
    progress: ["success", "warning", "pending"],
  },
];

const iconMap = {
  success: <CheckCircleIcon />,
  info: <ResourcesFullIcon />,
  pending: <Spinner isInline />,
  danger: <ExclamationCircleIcon />,
  warning: <ExclamationTriangleIcon />,
};

const recentActivityCard = (
  <Glass className="pf-m-full-height">
    <Card isPlain isFullHeight>
      <CardHeader
        actions={{
          actions: (
            <Dropdown
              isOpen={false} // Use a unique index for the header kebab
              onSelect={() => { }}
              onOpenChange={() => { }}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle
                  ref={toggleRef}
                  variant="plain"
                  onClick={() => { }}
                  isExpanded={false}
                >
                  <EllipsisVIcon />
                </MenuToggle>
              )}
              popperProps={{ position: "right" }}
            ></Dropdown>
          ),
          hasNoOffset: false,
          className: "",
        }}
      >
        <CardTitle>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <PortIcon />
            <span>Recent activity</span>
          </Flex>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table aria-label="Recent activity table" variant="compact">
          <Thead>
            <Tr>
              <Th width={30}>Name</Th>
              <Th width={30}>Project</Th>
              <Th width={30}>Progress</Th>
              <Th width={10} />
            </Tr>
          </Thead>
          <Tbody>
            {activityData.map((activity, rowIndex) => (
              <Tr key={activity.id}>
                <Td>
                  <Button variant="link" isInline component="a" href="#">
                    {activity.name}
                  </Button>
                </Td>
                <Td>
                  <Button variant="link" isInline component="a" href="#">
                    {activity.project}
                  </Button>
                </Td>
                <Td>
                  <ProgressStepper isCompact>
                    {activity.progress.map((stepVariant, stepIndex) => (
                      <ProgressStep
                        id={`progress-step-${rowIndex}-${stepVariant}-${stepIndex}`}
                        key={stepIndex}
                        variant={
                          stepVariant as
                          | "default"
                          | "success"
                          | "pending"
                          | "danger"
                          | "warning"
                          | "info"
                        }
                        icon={iconMap[stepVariant as keyof typeof iconMap]}
                        aria-label={`Step ${stepIndex + 1} is ${stepVariant}`}
                      />
                    ))}
                  </ProgressStepper>
                </Td>
                <Td isActionCell>
                  <Dropdown
                    isOpen={false}
                    onSelect={() => { }}
                    onOpenChange={() => { }}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        variant="plain"
                        onClick={() => { }}
                        isExpanded={false}
                      >
                        <EllipsisVIcon />
                      </MenuToggle>
                    )}
                    popperProps={{ position: "right" }}
                  ></Dropdown>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  </Glass>
);

export const AnimationsOverview: FunctionComponent = ({ }) => {
  return (
    <Fragment>
      <Grid hasGutter>
        <GridItem span={12} sm={12} md={6} lg={4} xl={3} rowSpan={4}>
          <Glass className="pf-m-full-height">
            <Card isPlain>
              <CardTitle>
                <Title headingLevel="h4" size="xl">
                  Cluster Details
                </Title>
              </CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Cluster API Address</DescriptionListTerm>
                    <DescriptionListDescription>
                      <a href="#">https://api1.devcluster.openshift.com</a>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Cluster ID</DescriptionListTerm>
                    <DescriptionListDescription>
                      63b97ac1-b850-41d9-8820-239becde9e86
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Provide</DescriptionListTerm>
                    <DescriptionListDescription>AWS</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>OpenShift Version</DescriptionListTerm>
                    <DescriptionListDescription>
                      4.5.0.ci-2020-06-16-015028
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Update Channel</DescriptionListTerm>
                    <DescriptionListDescription>
                      stable-4.5
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
              <Divider />
              <CardFooter>
                <a href="#">View Settings</a>
              </CardFooter>
            </Card>
          </Glass>
        </GridItem>
        <GridItem span={12} sm={12} md={6} lg={4} xl={3} rowSpan={2}>
          <AnimationsOverviewClusterInventory />
        </GridItem>
        <GridItem span={12} sm={12} md={6} lg={4} xl={3} rowSpan={2}>
          <AnimationsOverviewStorage />
        </GridItem>
        <GridItem span={12} sm={12} md={12} lg={8} xl={3} rowSpan={2}>
          <AnimationsOverviewMemoryUtilization />
        </GridItem>
        <GridItem span={12} sm={12} md={12} lg={12} xl={3} rowSpan={2}>
          <AnimationsOverviewNetworkActivity />
        </GridItem>
        {recentActivityCard && (
          <GridItem span={12} sm={12} md={12} lg={8} xl={6} rowSpan={2}>
            {recentActivityCard}
          </GridItem>
        )}
      </Grid>
    </Fragment>
  );
};

export default AnimationsOverview;
