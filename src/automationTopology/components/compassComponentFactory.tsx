import {
  GraphElement,
  ComponentFactory,
  withSelection,
  ModelKind,
  GraphComponent,
  withPanZoom, DefaultNode, DefaultEdge
} from '@patternfly/react-topology';
import CompassEdge from './CompassEdge.tsx';
import {
  ADD_NODE_TYPE, AGENT_NODE_TYPE,
  COMPASS_EDGE_TYPE,
  FINAL_EDGE_TYPE,
  PLATFORM_NODE_TYPE
} from '../const.ts';
import AddNode from './AddNode.tsx';
import FinalEdge from './FinalEdge.tsx';
import PlatformNode from './PlatformNode.tsx';
import AgentNode from './AgentNode.tsx';

const compassComponentFactory: ComponentFactory = (
  kind: ModelKind,
  type: string
): React.ComponentType<{ element: GraphElement }> | undefined => {
  if (kind === ModelKind.graph) {
    return withPanZoom()(withSelection()(GraphComponent));
  }
  switch (type) {
    case PLATFORM_NODE_TYPE:
      return withSelection()(PlatformNode);
    case AGENT_NODE_TYPE:
      return withSelection()(AgentNode);
    case ADD_NODE_TYPE:
      return AddNode;
    case COMPASS_EDGE_TYPE:
      return CompassEdge;
    case FINAL_EDGE_TYPE:
      return FinalEdge;
    default:
      switch (kind) {
        case ModelKind.node:
          return DefaultNode;
        case ModelKind.edge:
          return DefaultEdge;
        default:
          return undefined;
      }
  }
};

export default compassComponentFactory;
