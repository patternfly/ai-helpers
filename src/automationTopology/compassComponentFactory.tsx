import {
  GraphElement,
  ComponentFactory,
  withSelection,
  ModelKind,
  GraphComponent,
  withPanZoom, DefaultNode, DefaultEdge
} from '@patternfly/react-topology';
import CompassNode from './CompassNode.tsx';
import CompassEdge from './CompassEdge';
import { ADD_NODE_TYPE, COMPASS_EDGE_TYPE, COMPASS_NODE_TYPE, FINAL_EDGE_TYPE } from './const';
import AddNode from './AddNode.tsx';
import FinalEdge from './FinalEdge.tsx';

const compassComponentFactory: ComponentFactory = (
  kind: ModelKind,
  type: string
): React.ComponentType<{ element: GraphElement }> | undefined => {
  if (kind === ModelKind.graph) {
    return withPanZoom()(withSelection()(GraphComponent));
  }
  switch (type) {
    case COMPASS_NODE_TYPE:
      return withSelection()(CompassNode);
    case ADD_NODE_TYPE:
      return AddNode;
    case COMPASS_EDGE_TYPE:
      return withSelection()(CompassEdge);
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
