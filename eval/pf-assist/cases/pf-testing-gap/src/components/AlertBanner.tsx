import React from 'react';
import { Alert, AlertGroup, AlertActionCloseButton } from '@patternfly/react-core';

interface AlertItem {
  id: string;
  title: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

interface AlertBannerProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alerts, onDismiss }) => {
  return (
    <AlertGroup isToast isLiveRegion>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.variant}
          title={alert.title}
          actionClose={<AlertActionCloseButton onClose={() => onDismiss(alert.id)} />}
        />
      ))}
    </AlertGroup>
  );
};

export default AlertBanner;
