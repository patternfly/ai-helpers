import { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react';
import {
  GraphElement,
  Node,
  isNode,
} from '@patternfly/react-topology';
import CompassNode from './CompassNode.tsx';
import { AnsibleSubTypes } from '../type.ts';
import { TRIGGER_LEFT_RADIUS } from '../const.ts';
import AgentNodeContent from '../details/AgentNodeContent.tsx';

interface AgentNodeProps {
  element: GraphElement;
  selected?: boolean;
}
type AgentNodeInnerProps = Omit<AgentNodeProps, 'element'> & { element: Node };

const AgentNodeInner: FunctionComponent<AgentNodeInnerProps> = observer(
  ({ element, ...rest }) => {
    const { subType } = element.getData();
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
      <CompassNode
        element={element}
        topLeftRadius={subType === AnsibleSubTypes.TRIGGER ? TRIGGER_LEFT_RADIUS : undefined}
        bottomLeftRadius={subType === AnsibleSubTypes.TRIGGER ? TRIGGER_LEFT_RADIUS : undefined}
        {...rest}
      >
        <AgentNodeContent nodeData={element.getData()} expanded={expanded} setExpanded={setExpanded} />
      </CompassNode>
    );
  }
);

const AgentNode: FunctionComponent<AgentNodeProps> = ({ element, ...rest }: AgentNodeProps) => {
  if (!isNode(element)) {
    throw new Error('CompassNode must be used only on Node elements');
  }
  return (
    <AgentNodeInner element={element as Node} {...rest} />
  );
};

export default AgentNode;
