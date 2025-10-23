import type { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { EdgeTerminalType, GraphElement } from '@patternfly/react-topology';
import CompassEdge from './CompassEdge.tsx';

type FinalEdgeProps = {
  element: GraphElement;
};

const FinalEdge: FunctionComponent<FinalEdgeProps> = ({ element, ...rest }) => {
  return <CompassEdge element={element} endTerminalType={EdgeTerminalType.none} {...rest} />;
};

export default observer(FinalEdge);
