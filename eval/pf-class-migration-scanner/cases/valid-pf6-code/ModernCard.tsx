import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Label,
} from '@patternfly/react-core';

interface ModernCardProps {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  onAction: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  status,
  onAction,
}) => (
  <Card>
    <CardTitle>
      {title}
      <Label
        color={status === 'active' ? 'green' : 'grey'}
        className="pf-v6-u-ml-sm"
      >
        {status}
      </Label>
    </CardTitle>
    <CardBody>{description}</CardBody>
    <CardFooter>
      <Button variant="primary" onClick={onAction}>
        View Details
      </Button>
    </CardFooter>
  </Card>
);
