import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import { StatusIcon } from './StatusIcon';
import { LastUpdated } from './LastUpdated';

interface ServiceCardProps {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  lastChecked: Date;
}

const ServiceCard = ({ name, status, lastChecked }: ServiceCardProps) => (
  <Card>
    <CardTitle>{name}</CardTitle>
    <CardBody>
      <StatusIcon status={status} />
      <LastUpdated date={lastChecked} />
    </CardBody>
  </Card>
);

export default ServiceCard;
