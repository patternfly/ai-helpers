import { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import {
  Edge,
  EdgeTerminalType,
  GraphElement,
  isEdge,
  Point,
  DefaultConnectorTerminal,
} from '@patternfly/react-topology';
import {
  getConnectorStartPoint
} from '@patternfly/react-topology/dist/esm/components/edges/terminals/terminalUtils';
import styles from '@patternfly/react-topology/src/css/topology-components';
import { css } from '@patternfly/react-styles';

interface DefaultEdgeProps {
  element: GraphElement;
  startTerminalType?: EdgeTerminalType;
  startTerminalSize?: number;
  endTerminalType?: EdgeTerminalType;
  endTerminalSize?: number;
}

type DefaultEdgeInnerProps = Omit<DefaultEdgeProps, 'element'> & { element: Edge };

const DefaultEdgeInner: FunctionComponent<DefaultEdgeInnerProps> = observer(
  ({
    element,
    startTerminalType = EdgeTerminalType.none,
    startTerminalSize = 14,
    endTerminalType = EdgeTerminalType.directional,
    endTerminalSize = 14,
  }) => {
    const startPoint = element.getStartPoint();
    const endPoint = element.getEndPoint();

    const bendpoints = element.getBendpoints();

    const d = `M${startPoint.x} ${startPoint.y} ${bendpoints.map((b: Point) => `L${b.x} ${b.y} `).join('')}L${
      endPoint.x
    } ${endPoint.y}`;

    const bgStartPoint =
      !startTerminalType || startTerminalType === EdgeTerminalType.none
        ? [startPoint.x, startPoint.y]
        : getConnectorStartPoint(bendpoints?.[0] || endPoint, startPoint, startTerminalSize);
    const bgEndPoint =
      !endTerminalType || endTerminalType === EdgeTerminalType.none
        ? [endPoint.x, endPoint.y]
        : getConnectorStartPoint(bendpoints?.[bendpoints.length - 1] || startPoint, endPoint, endTerminalSize);
    const backgroundPath = `M${bgStartPoint[0]} ${bgStartPoint[1]} ${bendpoints
      .map((b: Point) => `L${b.x} ${b.y} `)
      .join('')}L${bgEndPoint[0]} ${bgEndPoint[1]}`;

    return (
      <g className={styles.topologyEdge}>
        <path className={css(styles.topologyEdgeBackground)} d={backgroundPath} style={{ cursor: 'default' }} />
        <path className={styles.topologyEdgeLink} d={d} style={{ cursor: 'default' }} />
        <DefaultConnectorTerminal
          isTarget={false}
          edge={element}
          size={startTerminalSize}
          terminalType={startTerminalType}
        />
        <DefaultConnectorTerminal
          isTarget
          edge={element}
          size={endTerminalSize}
          terminalType={endTerminalType}
        />
      </g>
    );
  }
);

const CompassEdge: FunctionComponent<DefaultEdgeProps> = ({
  element,
  startTerminalType = EdgeTerminalType.none,
  endTerminalType = EdgeTerminalType.directional,
  ...rest
}: DefaultEdgeProps) => {
  if (!isEdge(element)) {
    throw new Error('CompassEdge must be used only on Edge elements');
  }
  return (
    <DefaultEdgeInner
      element={element}
      startTerminalType={startTerminalType}
      endTerminalType={endTerminalType}
      {...rest}
    />
  );
};

export default CompassEdge;
