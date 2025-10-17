import { FunctionComponent, useState, useRef, useMemo, useEffect, LegacyRef } from 'react';
import { observer } from 'mobx-react';
import {
  GraphElement,
  OnSelect,
  Node,
  useHover,
  Layer,
  TOP_LAYER,
  NodeShadows,
  isNode,
  Rectangle,
  ScaleDetailsLevel,
  DEFAULT_LAYER
} from '@patternfly/react-topology';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-topology/src/css/topology-components';
import { useSize } from './useSize.ts';
import { CheckIcon } from '@patternfly/react-icons';
import CompassNodeContent from './CompassNodeContent.tsx';

interface CompassNodeProps {
  /** The graph node element to represent */
  element: GraphElement;
  /** Flag if the element selected. Part of WithSelectionProps */
  selected?: boolean;
  /** Function to call when the element should become selected (or deselected). Part of WithSelectionProps */
  onSelect?: OnSelect;
}
const SCALE_UP_TIME = 200;

type CompassNodeInnerProps = Omit<CompassNodeProps, 'element'> & { element: Node };

const CompassNodeInner: FunctionComponent<CompassNodeInnerProps> = observer(
  ({
     element,
     selected,
     onSelect,
   }) => {
    const [hovered, hoverRef] = useHover();
    const { width, height } = element.getDimensions();
    const [nodeScale, setNodeScale] = useState<number>(1);
    const detailsLevel = element.getGraph().getDetailsLevel();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [contentHeight, setContentHeight] = useState<number>();
    const [configuredLabelSize, configuredLabelRef] = useSize();
   const scaleNode = hovered && detailsLevel === ScaleDetailsLevel.low;
    const groupClassName = css(
      styles.topologyNode,
      hovered && 'pf-m-hover',
      selected && 'pf-m-selected'
    );

    const backgroundClassName = css(
      styles.topologyNodeBackground,
      selected && 'pf-m-selected'
    );

    const scale = element.getGraph().getScale();

    const animationRef = useRef<number>(null);
    const scaleGoal = useRef<number>(1);
    const nodeScaled = useRef<boolean>(false);

    useEffect(() => {
      if (!scaleNode || scale >= 1) {
        setNodeScale(1);
        nodeScaled.current = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          // @ts-ignore
          animationRef.current = 0;
        }
      } else {
        scaleGoal.current = 1 / scale;
        const scaleDelta = scaleGoal.current - scale;
        const initTime = performance.now();

        const bumpScale = (bumpTime: number) => {
          const scalePercent = (bumpTime - initTime) / SCALE_UP_TIME;
          const nextScale = Math.min(scale + scaleDelta * scalePercent, scaleGoal.current);
          setNodeScale(nextScale);
          if (nextScale < scaleGoal.current) {
            // @ts-ignore
            animationRef.current = requestAnimationFrame(bumpScale);
          } else {
            nodeScaled.current = true;
            // @ts-ignore
            animationRef.current = 0;
          }
        };

        if (nodeScaled.current) {
          setNodeScale(scaleGoal.current);
        } else if (!animationRef.current) {
          // @ts-ignore
          animationRef.current = requestAnimationFrame(bumpScale);
        }
      }
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          // @ts-ignore
          animationRef.current = 0;
        }
      };
    }, [scale, scaleNode]);

    const { translateX, translateY } = useMemo(() => {
      if (!scaleNode) {
        return { translateX: 0, translateY: 0 };
      }
      const bounds = element.getBounds();
      const translateX = bounds.width / 2 - (bounds.width / 2) * nodeScale;
      const translateY = bounds.height / 2 - (bounds.height / 2) * nodeScale;

      return { translateX, translateY };
    }, [element, nodeScale, scaleNode]);

    const contentRef = (content: HTMLDivElement) => {
      if (content) {
        setContentHeight(content.clientHeight);
      }
    };

    const renderAiConfigured = () => {
      if (!element.getData().aiConfigured) {
        return null;
      }
      const { width } = element.getDimensions();
      const labelWidth = configuredLabelSize?.width ?? 0;
      const labelHeight = configuredLabelSize?.height ?? 0;
      const iconSize = 14;
      const padding = 4;
      const fullLabelWidth = labelWidth + padding * 6;
      const fullLabelHeight = labelHeight + padding * 2;
      const labelPositionX = width / 2 - fullLabelWidth / 2;
      const labelPositionY = 0 - fullLabelHeight - padding * 2;

      const backgroundClassName = css(styles.topologyNodeBackground, selected && 'pf-m-selected');

      return (
        <g transform={`translate(${labelPositionX}, ${labelPositionY})`}>
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
    };

    const onContextMenu = () => {

    };

    return (
      <Layer id={hovered ? TOP_LAYER : DEFAULT_LAYER}>
        <g
          transform={`translate(0, ${(height - (contentHeight ?? 0)) / 2})`}
        >
          <g
            className={groupClassName}
            transform={`${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})`}
          >
            <NodeShadows />
            <g ref={hoverRef as LegacyRef<SVGGElement> | undefined} onClick={onSelect} onContextMenu={onContextMenu}>
              <Rectangle
                className={backgroundClassName}
                element={element}
                width={width}
                height={contentHeight ?? height}
              />
              {renderAiConfigured()}
              <g>
                <foreignObject
                  width={element.getDimensions().width}
                  height={contentHeight || element.getDimensions().height}
                >
                  <div ref={contentRef}>
                    <CompassNodeContent nodeData={element.getData()} expanded={expanded} setExpanded={setExpanded} />
                  </div>
                </foreignObject>
              </g>
            </g>
          </g>
        </g>
      </Layer>
    );
  }
);

const CompassNode: React.FunctionComponent<CompassNodeProps> = ({
  element,
  ...rest
}: CompassNodeProps) => {
  if (!isNode(element)) {
    throw new Error('DefaultNode must be used only on Node elements');
  }
  return (
    <CompassNodeInner element={element as Node} {...rest} />
  );
};

export default CompassNode;
