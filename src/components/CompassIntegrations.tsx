import { useState, Fragment } from "react";
import {
  Page,
  PageSection,
  Card,
  CardBody,
  Content,
  CardHeader,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  SearchInput,
  ToggleGroup,
  ToggleGroupItem,
  Gallery,
  MenuToggle,
  MenuToggleElement,
  Dropdown,
  Pagination,
  Flex,
  FlexItem,
  Title,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
} from "@patternfly/react-core";
import { ActionsColumn } from "@patternfly/react-table";

import { DataViewTable } from "@patternfly/react-data-view/dist/dynamic/DataViewTable";
import { DataViewToolbar } from "@patternfly/react-data-view/dist/dynamic/DataViewToolbar";
import { DataViewFilters } from "@patternfly/react-data-view/dist/dynamic/DataViewFilters";
import { DataViewTextFilter } from "@patternfly/react-data-view/dist/dynamic/DataViewTextFilter";
import ThIcon from "@patternfly/react-icons/dist/esm/icons/th-icon";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import ListIcon from "@patternfly/react-icons/dist/esm/icons/list-icon";

export const CompassIntegrations: React.FunctionComponent = () => {
  const [integrationTableDisplay, setIntegrationTableDisplay] = useState(false);
  const integrations = [
    {
      id: 1,
      name: "Ansible Automation Platform",
      description:
        "Ansible Automation Platform is an entrprise framework for building and operating IT automation at scale.",
      status: "success",
      statusText: "Connected",
      type: "MCP Server",
      url: "ansible.example.com",
    },
    {
      id: 2,
      name: "Github",
      description:
        "Github is a code hosting platform for version control and collaboration. ",
      status: "danger",
      statusText: "Disconnected",
      type: "Version Control",
      url: "github.example.com",
    },
    {
      id: 3,
      name: "Kubernetes Cluster",
      description:
        "A Kubernetes cluster is a set of node machines for running containerized applications.",
      status: "warning",
      statusText: "Invalid fields",
      type: "MCP Server",
      url: "k8s.example.com",
    },
  ];

  const rowActions = [
    {
      title: "Some action",
      onClick: () => console.log("clicked on Some action"), // eslint-disable-line no-console
    },
    {
      title: <div>Another action</div>,
      onClick: () => console.log("clicked on Another action"), // eslint-disable-line no-console
    },
    {
      isSeparator: true,
    },
    {
      title: "Third action",
      onClick: () => console.log("clicked on Third action"), // eslint-disable-line no-console
    },
  ];

  const rows = integrations.map(
    ({ name, type, status, statusText }, index) => ({
      id: name,
      row: [
        {
          id: "select",
          row: name,
          cell: undefined,
          props: {
            select: {
              index,
              rowIndex: index,
              onSelect: () => {},
              isSelected: false,
            },
          },
        },
        name,
        type,
        {
          cell: (
            <Label
              status={
                status as
                  | "success"
                  | "danger"
                  | "warning"
                  | "info"
                  | "custom"
                  | undefined
              }
              isCompact
            >
              {statusText}
            </Label>
          ),
        },
        {
          cell: <ActionsColumn items={rowActions} />,
          props: { isActionCell: true },
        },
      ],
    })
  );

  const columns = [
    {
      cell: undefined,
      props: {
        select: {
          onSelect: () => {},
          isSelected: false,
        },
      },
    },
    "Name",
    "Type",
    "Status",
  ];

  const cardIntegration = (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup>
            <ToolbarItem>
              <SearchInput
                aria-label="Integrations example search input"
                placeholder="Filter by name"
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToggleGroup>
            <ToggleGroupItem
              icon={<ThIcon />}
              aria-label="grid icon button"
              isSelected={!integrationTableDisplay}
              onChange={() => {
                console.log("clicked on grid icon button");
                setIntegrationTableDisplay(false);
              }}
            ></ToggleGroupItem>
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="list icon button"
              isSelected={integrationTableDisplay}
              onChange={() => {
                console.log("clicked on list icon button");
                setIntegrationTableDisplay(true);
              }}
            ></ToggleGroupItem>
          </ToggleGroup>
          <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
            <Pagination
              itemCount={523}
              perPage={20}
              page={1}
              onSetPage={() => {}}
              widgetId="pagination-options-card-view"
              onPerPageSelect={() => {}}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Flex flexWrap={{ default: "nowrap" }}>
        {integrations.map((product) => (
          <FlexItem key={product.name} grow={{ default: "grow" }}>
            <Card
              isCompact
              isFullHeight
              key={product.name}
              id={product.name.replace(/ /g, "-")}
            >
              <CardHeader
                actions={{
                  actions: (
                    <>
                      <Dropdown
                        isOpen={false}
                        onOpenChange={() => {}}
                        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                          <MenuToggle
                            ref={toggleRef}
                            aria-label={`${product.name} actions`}
                            variant="plain"
                            icon={<EllipsisVIcon />}
                          />
                        )}
                        popperProps={{ position: "right" }}
                      />
                    </>
                  ),
                }}
              >
                <Content component="h4">{product.name}</Content>
                <Content component="small">{product.type}</Content>
              </CardHeader>
              <CardBody isFilled>{product.description}</CardBody>
              <CardBody>
                <DescriptionList aria-label="Details">
                  <DescriptionListGroup>
                    <DescriptionListTerm>Status</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Label
                        status={
                          product.status as
                            | "success"
                            | "danger"
                            | "warning"
                            | "info"
                            | "custom"
                            | undefined
                        }
                        isCompact
                      >
                        {product.statusText}
                      </Label>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Url</DescriptionListTerm>
                    <DescriptionListDescription>
                      <a>{product.url}</a>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </FlexItem>
        ))}
      </Flex>
    </>
  );
  const dataViewIntegration = (
    <>
      <DataViewToolbar
        clearAllFilters={() => {}}
        filters={
          <DataViewTextFilter
            filterId="name"
            title="Name"
            placeholder="Filter by name"
          />
        }
        actions={
          <ToggleGroup>
            <ToggleGroupItem
              icon={<ThIcon />}
              aria-label="grid icon button"
              isSelected={!integrationTableDisplay}
              onChange={() => setIntegrationTableDisplay(false)}
            ></ToggleGroupItem>
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="list icon button"
              isSelected={integrationTableDisplay}
              onChange={() => setIntegrationTableDisplay(true)}
            ></ToggleGroupItem>
          </ToggleGroup>
        }
        pagination={<Pagination page={1} perPage={10} isCompact />}
      />
      <DataViewTable
        aria-label="Integrations table"
        columns={columns}
        rows={rows}
      />
    </>
  );

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
              <Title headingLevel="h1">Integrations</Title>
            </FlexItem>
            <FlexItem>
              <Toolbar hasNoPadding>
                <ToolbarContent>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <Button variant="primary">Add integration</Button>
                    </ToolbarItem>
                    <ToolbarItem>
                      <Button variant="secondary">Test integration</Button>
                    </ToolbarItem>
                  </ToolbarGroup>
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
        <PageSection>
          {integrationTableDisplay && dataViewIntegration}
          {!integrationTableDisplay && cardIntegration}
        </PageSection>
      </Page>
    </Fragment>
  );
};
