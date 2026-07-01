import React from 'react';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface StatusCardProps {
  title: string;
  healthy: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, healthy }) => {
  return (
    <Card style={{ backgroundColor: healthy ? '#3E8635' : '#C9190B' }}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>
          {healthy ? 'Healthy' : 'Down'}
        </span>
      </CardBody>
    </Card>
  );
};

export default StatusCard;
