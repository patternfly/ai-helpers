import type { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { DefaultEdge, GraphElement, WithSelectionProps } from '@patternfly/react-topology';

type CompassEdgeProps = {
  element: GraphElement;
} & Partial<WithSelectionProps>;

const CompassEdge: FunctionComponent<CompassEdgeProps> = ({ element, ...rest }) => {
  return <DefaultEdge element={element} {...rest} />;
};

export default observer(CompassEdge);
