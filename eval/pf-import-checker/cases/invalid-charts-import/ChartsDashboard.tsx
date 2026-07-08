import React from 'react';
import { Chart, ChartBar, ChartGroup, ChartThemeColor } from '@patternfly/react-charts';
import { Card, CardBody, CardTitle } from '@patternfly/react-core';

interface ChartsDashboardProps {
  data: { name: string; x: string; y: number }[];
}

export const ChartsDashboard: React.FC<ChartsDashboardProps> = ({ data }) => (
  <Card>
    <CardTitle>Usage Metrics</CardTitle>
    <CardBody>
      <Chart
        themeColor={ChartThemeColor.blue}
        height={250}
        width={600}
        padding={{ bottom: 50, left: 50, right: 50, top: 20 }}
      >
        <ChartGroup>
          <ChartBar data={data} />
        </ChartGroup>
      </Chart>
    </CardBody>
  </Card>
);
