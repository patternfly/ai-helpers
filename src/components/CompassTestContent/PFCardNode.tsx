import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Title,
  Badge,
  Button,
} from "@patternfly/react-core";
import { useContentDrawer } from "./ContentDrawerContext";

interface PFCardNodeData {
  title: string;
  status: string;
  description: string;
  details: Array<{
    term: string;
    description: string;
  }>;
  actionText?: string;
  onAction?: () => void;
}

const PFCardNode = memo(
  ({
    data,
    isConnectable,
  }: {
    data: PFCardNodeData;
    isConnectable: boolean;
  }) => {
    const { openContentDrawer } = useContentDrawer();

    return (
      <>
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ background: "#555" }}
        />
        <div style={{ minWidth: "300px", maxWidth: "400px" }}>
          <Card isFullHeight>
            <CardTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title headingLevel="h4" size="lg">
                  {data.title}
                </Title>
                <Badge isRead>{data.status}</Badge>
              </div>
            </CardTitle>
            <CardBody>
              <p
                style={{
                  marginBottom: "16px",
                  fontSize: "14px",
                  color: "#6a6e73",
                }}
              >
                {data.description}
              </p>
              <DescriptionList>
                {data.details.map((detail, index) => (
                  <DescriptionListGroup key={index}>
                    <DescriptionListTerm>{detail.term}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {detail.description}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
            </CardBody>
            {data.actionText && (
              <>
                <Divider />
                <CardFooter>
                  <Button
                    variant="link"
                    onClick={() => {
                      // Call the original action if provided
                      data.onAction?.();
                      // Also open the content drawer
                      openContentDrawer();
                    }}
                    style={{ padding: 0 }}
                  >
                    {data.actionText}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          style={{ background: "#555" }}
        />
      </>
    );
  }
);

PFCardNode.displayName = "PFCardNode";

export default PFCardNode;
