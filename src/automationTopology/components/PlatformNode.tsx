import { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react';
import {
  GraphElement,
  OnSelect,
  Node,
  isNode,
} from '@patternfly/react-topology';
import CompassNode from './CompassNode.tsx';
import { AnsibleSubTypes } from '../type.ts';
import { TRIGGER_LEFT_RADIUS } from '../const.ts';
import PlatformNodeContent from '../details/PlatformNodeContent.tsx';

interface PlatformNodeProps {
  /** The graph node element to represent */
  element: GraphElement;
  /** Flag if the element selected. Part of WithSelectionProps */
  selected?: boolean;
  /** Function to call when the element should become selected (or deselected). Part of WithSelectionProps */
  onSelect?: OnSelect;
  topRightRadius?: number;
  topLeftRadius?: number;
  bottomRightRadius?: number;
  bottomLeftRadius?: number;
}
type PlatformNodeInnerProps = Omit<PlatformNodeProps, 'element'> & { element: Node };

const PlatformNodeInner: FunctionComponent<PlatformNodeInnerProps> = observer(
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
        <PlatformNodeContent nodeData={element.getData()} expanded={expanded} setExpanded={setExpanded} />
      </CompassNode>
    );
  }
);

const PlatformNode: React.FunctionComponent<PlatformNodeProps> = ({ element, ...rest }: PlatformNodeProps) => {
  if (!isNode(element)) {
    throw new Error('CompassNode must be used only on Node elements');
  }
  return (
    <PlatformNodeInner element={element as Node} {...rest} />
  );
};

export default PlatformNode;
