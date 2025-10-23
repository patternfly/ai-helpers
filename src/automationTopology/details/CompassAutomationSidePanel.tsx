import { FunctionComponent } from 'react';
import { AnsibleObjectType, AnsibleTypes } from '../type.ts';
import { TopologySideBar } from '@patternfly/react-topology';
import PlatformNodeDetailsPanel from './PlatformNodeDetailsPanel.tsx';
import AgentNodeDetailsPanel from './AgentNodeDetailsPanel.tsx';

type Props = {
  ansibleObject: AnsibleObjectType;
  onClose: () => void;
}

const CompassAutomationSidePanel: FunctionComponent<Props> = ({ ansibleObject, onClose  }) => {
  const renderContents = () => {
    if (!ansibleObject) {
      return null;
    }
    if (ansibleObject.type === AnsibleTypes.AUTOMATION_PLATFORM) {
      return <PlatformNodeDetailsPanel ansibleObject={ansibleObject} onClose={onClose} />;
    }
    if (ansibleObject.type === AnsibleTypes.ANALYSIS_AGENT) {
      return <AgentNodeDetailsPanel ansibleObject={ansibleObject} onClose={onClose} />;
    }
    return (
      <div style={{ marginTop: 27, marginLeft: 20 }}>{ansibleObject.type}</div>
    )
  }
  return (
    <TopologySideBar show={!!ansibleObject} onClose={() => onClose()}>
      {renderContents()}
    </TopologySideBar>
  );
};

export default CompassAutomationSidePanel;
