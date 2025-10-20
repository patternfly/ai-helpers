import { useState, Fragment, useRef, useEffect } from "react";
import {
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
  Icon,
  Badge,
} from "@patternfly/react-core";
import { ActionsColumn } from "@patternfly/react-table";
import { DataViewTable } from "@patternfly/react-data-view/dist/dynamic/DataViewTable";
import { DataViewToolbar } from "@patternfly/react-data-view/dist/dynamic/DataViewToolbar";
import { DataViewTextFilter } from "@patternfly/react-data-view/dist/dynamic/DataViewTextFilter";
import { SwitchToolTable } from "./IntegrationsContent/SwitchToolTable.tsx";

import ThIcon from "@patternfly/react-icons/dist/esm/icons/th-icon";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import ListIcon from "@patternfly/react-icons/dist/esm/icons/list-icon";
import { rhServerStackIcon } from "./lib/assets/rhServerStackIcon";
import { Glass } from "./lib/Glass";
import { CompassFooter } from "./lib/CompassFooter";
import { CompassPage } from "./lib/CompassPage";
import { CompassPageBody } from "./lib/CompassPageBody";

export const CompassIntegrations: React.FunctionComponent = () => {
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Remove if we decide to not use the feathered opacity scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const bodyElement = bodyRef.current;
      if (!bodyElement) return;

      const scrollTop = bodyElement.scrollTop;
      const scrollHeight = bodyElement.scrollHeight;
      const clientHeight = bodyElement.clientHeight;

      // Check if at the top (within 20px threshold)
      if (scrollTop <= 20) {
        bodyElement.style.setProperty(
          "--compass__scroll-top",
          scrollTop.toString()
        );
      }
      // Check if at the bottom (within 20px threshold)
      else if (scrollTop + clientHeight >= scrollHeight - 20) {
        bodyElement.style.setProperty(
          "--compass__scroll-bottom",
          (scrollHeight - (scrollTop + clientHeight)).toString()
        );
      }
    };

    // Listen only to the compass__body element scroll
    const bodyElement = bodyRef.current;
    if (bodyElement) {
      bodyElement.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
    {
      id: 4,
      name: "Docker Registry",
      description:
        "A Docker registry is a storage and distribution system for Docker images.",
      status: "success",
      statusText: "Connected",
      type: "Container Registry",
      url: "registry.example.com",
    },
    {
      id: 5,
      name: "Jenkins CI/CD",
      description:
        "Jenkins is an open source automation server for building, testing, and deploying software.",
      status: "success",
      statusText: "Connected",
      type: "CI/CD",
      url: "jenkins.example.com",
    },
    {
      id: 6,
      name: "GitLab",
      description:
        "GitLab is a complete DevOps platform delivered as a single application.",
      status: "danger",
      statusText: "Disconnected",
      type: "Version Control",
      url: "gitlab.example.com",
    },
    {
      id: 7,
      name: "Prometheus",
      description:
        "Prometheus is a monitoring system and time series database for metrics collection.",
      status: "success",
      statusText: "Connected",
      type: "Monitoring",
      url: "prometheus.example.com",
    },
    {
      id: 8,
      name: "Elasticsearch",
      description:
        "Elasticsearch is a distributed search and analytics engine for all types of data.",
      status: "warning",
      statusText: "Degraded",
      type: "Search Engine",
      url: "elasticsearch.example.com",
    },
    {
      id: 9,
      name: "Redis Cache",
      description:
        "Redis is an in-memory data structure store used as a database, cache, and message broker.",
      status: "success",
      statusText: "Connected",
      type: "Cache",
      url: "redis.example.com",
    },
    {
      id: 10,
      name: "PostgreSQL Database",
      description:
        "PostgreSQL is a powerful, open source object-relational database system.",
      status: "success",
      statusText: "Connected",
      type: "Database",
      url: "postgres.example.com",
    },
    {
      id: 11,
      name: "Apache Kafka",
      description:
        "Apache Kafka is a distributed event streaming platform for building real-time data pipelines.",
      status: "warning",
      statusText: "Limited",
      type: "Message Queue",
      url: "kafka.example.com",
    },
    {
      id: 12,
      name: "Terraform",
      description:
        "Terraform is an infrastructure as code tool for building, changing, and versioning infrastructure.",
      status: "success",
      statusText: "Connected",
      type: "Infrastructure",
      url: "terraform.example.com",
    },
    {
      id: 13,
      name: "Splunk",
      description:
        "Splunk is a platform for searching, monitoring, and analyzing machine-generated big data.",
      status: "danger",
      statusText: "Disconnected",
      type: "Logging",
      url: "splunk.example.com",
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
      <Gallery hasGutter>
        {integrations.map((product) => (
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
        ))}
      </Gallery>
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
  // refactor into a GlassPanels component? Prop is an array of reactnode that are PageSection content and internal component provides the Glass and PageSection with hasOverflowScroll
  const addIntegration = (
    <>
      <Glass>
        <PageSection hasOverflowScroll>
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
                      <Icon size="xl">{rhServerStackIcon}</Icon>
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
                      <Icon size="xl">{rhServerStackIcon}</Icon>
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
                      <Icon size="xl">{rhServerStackIcon}</Icon>
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
                      <Icon size="xl">{rhServerStackIcon}</Icon>
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
              <MenuToggle isFullWidth>Resource type</MenuToggle>
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
      </Glass>
      <Glass>
        <PageSection hasOverflowScroll>
          <Flex alignItems={{ default: "alignItemsCenter" }}>
            <FlexItem grow={{ default: "grow" }}>
              <Title headingLevel="h2">
                Enable tools <Badge>161</Badge>
              </Title>
            </FlexItem>
            <FlexItem>
              <Toolbar hasNoPadding>
                <ToolbarContent>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <SearchInput
                        aria-label="Integrations example search input"
                        placeholder="Search tools"
                      />
                    </ToolbarItem>
                  </ToolbarGroup>
                </ToolbarContent>
              </Toolbar>
            </FlexItem>
          </Flex>
          <SwitchToolTable />
          <CompassFooter>161 tools selected</CompassFooter>
        </PageSection>
      </Glass>
    </>
  );

  // refactor into BasicCompassHeader component? Prop for the Title component and Toolbar Content children
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
      <CompassPage
        toolbar={(() => {
          if (activeDisplay === "add") {
            return addIntegrationHeader;
          } else {
            return integrationHeader;
          }
        })()}
        body={
          <CompassPageBody
            ref={bodyRef}
            isPlain={activeDisplay === "add"}
            isGroup={activeDisplay === "add"}
            pageSectionProps={
              activeDisplay === "add" ? {} : { hasOverflowScroll: true }
            }
          >
            {(() => {
              if (activeDisplay === "add") {
                return addIntegration;
              } else if (activeDisplay === "list") {
                return dataViewIntegration;
              } else {
                return cardIntegration;
              }
            })()}
          </CompassPageBody>
        }
      />
    </Fragment>
  );
};
