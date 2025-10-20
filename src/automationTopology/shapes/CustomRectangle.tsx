import { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { RectAnchor, ShapeProps, useAnchor } from '@patternfly/react-topology';
import styles from '@patternfly/react-topology/src/css/topology-components';

const DEFAULT_RADIUS = 15;

type CustomRectangleProps = ShapeProps & {
  topRightRadius?: number;
  topLeftRadius?: number;
  bottomRightRadius?: number;
  bottomLeftRadius?: number;
};

const CustomRectangle: FunctionComponent<CustomRectangleProps> = ({
  className = css(styles.topologyNodeBackground),
  width,
  height,
  filter,
  topRightRadius = DEFAULT_RADIUS,
  topLeftRadius = DEFAULT_RADIUS,
  bottomRightRadius = DEFAULT_RADIUS,
  bottomLeftRadius = DEFAULT_RADIUS,
  dndDropRef
}) => {
  // @ts-ignore
  useAnchor(RectAnchor);

  const path = `M ${topLeftRadius - (topLeftRadius - DEFAULT_RADIUS)},${0} ` +
    `h ${width - topRightRadius - topLeftRadius + (topRightRadius - DEFAULT_RADIUS) + (topLeftRadius - DEFAULT_RADIUS)} ` +
    `a ${topRightRadius} ${topRightRadius} 0 0 1 ${topRightRadius} ${topRightRadius} ` +
    `v ${height - topRightRadius - bottomRightRadius} ` +
    `a ${bottomRightRadius} ${bottomRightRadius} 0 0 1 -${bottomRightRadius} ${bottomRightRadius} ` +
    `h -${width - topRightRadius - topLeftRadius + (topRightRadius - DEFAULT_RADIUS) + (topLeftRadius - DEFAULT_RADIUS)} ` +
    `a ${bottomLeftRadius} ${bottomLeftRadius} 0 0 1 -${bottomLeftRadius} -${bottomLeftRadius} ` +
    `v -${height - topLeftRadius - bottomLeftRadius} ` +
    `a ${topLeftRadius} ${topLeftRadius} 0 0 1 ${topLeftRadius} -${topLeftRadius} ` +
    `z`;
  return (
    <path
      className={className}
      ref={dndDropRef}
      d={path}
      filter={filter}
    />
  );
};

export default CustomRectangle;