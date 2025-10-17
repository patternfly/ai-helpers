import type { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { DefaultEdge, EdgeTerminalType, GraphElement } from '@patternfly/react-topology';

type FinalEdgeProps = {
  element: GraphElement;
};

const FinalEdge: FunctionComponent<FinalEdgeProps> = ({ element, ...rest }) => {
  return <DefaultEdge element={element} endTerminalType={EdgeTerminalType.none} {...rest} />;
};

export default observer(FinalEdge);
