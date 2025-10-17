import { useState, Fragment, useRef } from "react";
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
  FormGroupLabelHelp,
  Form,
  FormGroup,
  Popover,
  TextInput,
  ActionGroup,
  HelperTextItem,
  FormHelperText,
  HelperText,
  Gallery,
  PageGroup,
} from "@patternfly/react-core";
import { ActionsColumn } from "@patternfly/react-table";

import { DataViewTable } from "@patternfly/react-data-view/dist/dynamic/DataViewTable";
import { DataViewToolbar } from "@patternfly/react-data-view/dist/dynamic/DataViewToolbar";
import { DataViewTextFilter } from "@patternfly/react-data-view/dist/dynamic/DataViewTextFilter";
import ThIcon from "@patternfly/react-icons/dist/esm/icons/th-icon";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import ListIcon from "@patternfly/react-icons/dist/esm/icons/list-icon";
import ServerIcon from "@patternfly/react-icons/dist/esm/icons/server-icon";

export const CompassIntegrations: React.FunctionComponent = () => {
  const [activeDisplay, setActiveDisplay] = useState("grid");

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
              variant="outline"
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
              isSelected={activeDisplay === "grid"}
              onChange={() => {
                setActiveDisplay("grid");
              }}
            ></ToggleGroupItem>
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="list icon button"
              isSelected={activeDisplay === "list"}
              onChange={() => {
                setActiveDisplay("list");
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
                        variant="outline"
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
              isSelected={activeDisplay === "grid"}
              onChange={() => setActiveDisplay("grid")}
            ></ToggleGroupItem>
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="list icon button"
              isSelected={activeDisplay === "list"}
              onChange={() => setActiveDisplay("list")}
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

  const integrationTypeHelpRef = useRef<HTMLDivElement>(null);
  const nameHelpRef = useRef<HTMLDivElement>(null);
  const serverHelpRef = useRef<HTMLDivElement>(null);
  const serverTypeHelpRef = useRef<HTMLDivElement>(null);
  const addIntegration = (
    <>
      <PageSection>
        <Content component="h2">Configure integration</Content>
        <Form>
          <FormGroup
            label="Integration type"
            labelHelp={
              <Popover
                triggerRef={integrationTypeHelpRef}
                headerContent={<div>test</div>}
                bodyContent={<div>test</div>}
              >
                <FormGroupLabelHelp
                  ref={integrationTypeHelpRef}
                  aria-label="More info for type field"
                />
              </Popover>
            }
            isRequired
            fieldId="form-type"
          >
            <Gallery hasGutter>
              <Card id="tile-example-1" isSelectable isSelected={true}>
                <CardHeader
                  selectableActions={{
                    selectableActionId: "id1",
                    selectableActionAriaLabelledby: "tile-example-1",
                    name: "id1",
                    variant: "single",
                    onChange: () => {},
                    isHidden: true,
                  }}
                >
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    <ServerIcon />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    MCP Server
                  </Flex>
                </CardBody>
              </Card>
              <Card id="tile-example-2" isSelectable isSelected={false}>
                <CardHeader
                  selectableActions={{
                    selectableActionId: "id2",
                    selectableActionAriaLabelledby: "tile-example-2",
                    name: "id2",
                    variant: "single",
                    onChange: () => {},
                    isHidden: true,
                  }}
                >
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    <ServerIcon />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    [integration type]
                  </Flex>
                </CardBody>
              </Card>
              <Card id="tile-example-3" isSelectable isSelected={false}>
                <CardHeader
                  selectableActions={{
                    selectableActionId: "id3",
                    selectableActionAriaLabelledby: "tile-example-3",
                    name: "id3",
                    variant: "single",
                    onChange: () => {},
                    isHidden: true,
                  }}
                >
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    <ServerIcon />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    [integration type]
                  </Flex>
                </CardBody>
              </Card>
              <Card
                id="tile-example-4"
                isSelectable
                isDisabled
                isSelected={false}
              >
                <CardHeader
                  selectableActions={{
                    selectableActionId: "id4",
                    selectableActionAriaLabelledby: "tile-example-4",
                    name: "id4",
                    variant: "single",
                    onChange: () => {},
                    isHidden: true,
                  }}
                >
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    <ServerIcon />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex
                    gap={{ default: "gapSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                  >
                    [integration type]
                  </Flex>
                </CardBody>
              </Card>
            </Gallery>
          </FormGroup>
          <FormGroup
            label="Full name"
            labelHelp={
              <Popover
                triggerRef={nameHelpRef}
                headerContent={<div>test</div>}
                bodyContent={<div>test</div>}
              >
                <FormGroupLabelHelp
                  ref={nameHelpRef}
                  aria-label="More info for name field"
                />
              </Popover>
            }
            isRequired
            fieldId="form-name"
          >
            <TextInput
              isRequired
              type="text"
              id="form-name"
              name="form-name"
              value="Pineapple"
              onChange={() => {}}
            />
          </FormGroup>
          <FormGroup
            label="Server name / ID"
            isRequired
            fieldId="form-server"
            labelHelp={
              <Popover
                triggerRef={serverHelpRef}
                headerContent={<div>test</div>}
                bodyContent={<div>test</div>}
              >
                <FormGroupLabelHelp
                  ref={serverHelpRef}
                  aria-label="More info for server field"
                />
              </Popover>
            }
          >
            <TextInput
              isRequired
              type="text"
              id="form-server"
              name="form-server"
              value="https://example.com"
              onChange={() => {}}
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem>Other help text.</HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
          <FormGroup
            label="Server type"
            fieldId="form-server-type"
            labelHelp={
              <Popover
                triggerRef={serverTypeHelpRef}
                headerContent={<div>test</div>}
                bodyContent={<div>test</div>}
              >
                <FormGroupLabelHelp
                  ref={serverTypeHelpRef}
                  aria-label="More info for server type field"
                />
              </Popover>
            }
          >
            <MenuToggle>Resource type</MenuToggle>
          </FormGroup>
          <ActionGroup>
            <Button
              variant="primary"
              onChange={() => {
                setActiveDisplay("grid");
              }}
            >
              Add integration
            </Button>
            <Button
              variant="secondary"
              onChange={() => {
                setActiveDisplay("grid");
              }}
            >
              Test integration
            </Button>
            <Button
              variant="link"
              onChange={() => {
                setActiveDisplay("grid");
              }}
            >
              Cancel
            </Button>
          </ActionGroup>
        </Form>
      </PageSection>
      <PageSection></PageSection>
    </>
  );

  const integrationHeader = (
    <Flex alignItems={{ default: "alignItemsCenter" }}>
      <FlexItem grow={{ default: "grow" }}>
        <Title headingLevel="h1">Integrations</Title>
      </FlexItem>
      <FlexItem>
        <Toolbar hasNoPadding>
          <ToolbarContent>
            <ToolbarGroup>
              <ToolbarItem>
                <Button
                  variant="primary"
                  onClick={() => setActiveDisplay("add")}
                >
                  Add integration
                </Button>
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
  );

  const addIntegrationHeader = (
    <Flex alignItems={{ default: "alignItemsCenter" }}>
      <FlexItem grow={{ default: "grow" }}>
        <Title headingLevel="h1">Configure integration</Title>
      </FlexItem>
      <FlexItem>
        <Toolbar hasNoPadding>
          <ToolbarContent>
            <ToolbarGroup>
              <ToolbarItem>
                <Button
                  variant="secondary"
                  onClick={() => setActiveDisplay("grid")}
                >
                  Cancel
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  variant="primary"
                  onClick={() => setActiveDisplay("grid")}
                >
                  Add integration
                </Button>
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </FlexItem>
    </Flex>
  );

  return (
    <Fragment>
      <Page
        id="pf-compass-center"
        className="pf-m-no-sidebar pf-m-plain"
        isContentFilled
      >
        <PageSection>
          {(() => {
            if (activeDisplay === "add") {
              return addIntegrationHeader;
            } else {
              return integrationHeader;
            }
          })()}
        </PageSection>
        {(() => {
          if (activeDisplay === "add") {
            return <PageGroup>{addIntegration}</PageGroup>;
          } else if (activeDisplay === "list") {
            return <PageSection>{dataViewIntegration}</PageSection>;
          } else {
            return <PageSection>{cardIntegration}</PageSection>;
          }
        })()}
      </Page>
    </Fragment>
  );
};
