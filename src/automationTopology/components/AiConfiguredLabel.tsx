import { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { Node } from '@patternfly/react-topology';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-topology/src/css/topology-components';
import { useSize } from '../useSize.ts';
import { CheckIcon } from '@patternfly/react-icons';

interface AiConfiguredLabelProps {
  element: Node;
}

const AiConfiguredLabel: FunctionComponent<AiConfiguredLabelProps> = observer(({ element }) => {
  const { width } = element.getDimensions();
  const [configuredLabelSize, configuredLabelRef] = useSize();

  if (!element.getData().aiConfigured) {
    return null;
  }
  const labelWidth = configuredLabelSize?.width ?? 0;
  const labelHeight = configuredLabelSize?.height ?? 0;
  const iconSize = 14;
  const padding = 4;
  const fullLabelWidth = labelWidth + padding * 6;
  const fullLabelHeight = labelHeight + padding * 2;
  const labelPositionX = width - fullLabelWidth;
  const labelPositionY = 0 - fullLabelHeight - padding * 2;

  const backgroundClassName = css(styles.topologyNodeBackground, 'compass__node-label');

  return (
    <g transform={`translate(${labelPositionX}, ${labelPositionY})`} style={{ visibility: configuredLabelSize ? 'visible' : 'hidden' }}>
      <rect
        className={backgroundClassName}
        x={0}
        y={0}
        rx={15}
        ry={15}
        width={fullLabelWidth}
        height={fullLabelHeight}
      />
      <g ref={configuredLabelRef} className={css(styles.topologyNodeLabel)}>
        <foreignObject
          className={css(styles.topologyNodeLabelIcon)}
          x={iconSize / 2 + padding}
          y={padding / 2 + 2}
          width={iconSize}
          height={iconSize}
        >
          <CheckIcon style={{ fill: 'var(--pf-topology__node--m-success--Background--Fill)' }} />
        </foreignObject>
        <text x={iconSize + padding * 4} y={18}>
          AI Configured
        </text>
      </g>
    </g>
  );
});

export default AiConfiguredLabel;
