import { FunctionComponent, ReactNode, useState, useRef, useMemo, useEffect, LegacyRef } from 'react';
import { observer } from 'mobx-react';
import {
  GraphElement,
  OnSelect,
  Node,
  useHover,
  NodeShadows,
  isNode,
  ScaleDetailsLevel,
} from '@patternfly/react-topology';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-topology/src/css/topology-components';
import CustomRectangle from '../shapes/CustomRectangle.tsx';
import AiConfiguredLabel from './AiConfiguredLabel.tsx';

interface CompassNodeProps {
  element: GraphElement;
  selected?: boolean;
  onSelect?: OnSelect;
  topRightRadius?: number;
  topLeftRadius?: number;
  bottomRightRadius?: number;
  bottomLeftRadius?: number;
  expanded?: boolean;
  children?: ReactNode;
}
const SCALE_UP_TIME = 200;

type CompassNodeInnerProps = Omit<CompassNodeProps, 'element'> & { element: Node };

const CompassNodeInner: FunctionComponent<CompassNodeInnerProps> = observer(
  ({
     element,
     selected,
     onSelect,
     topRightRadius,
     topLeftRadius,
     bottomRightRadius,
     bottomLeftRadius,
     children,
   }) => {
    const [hovered, hoverRef] = useHover();
    const { width, height } = element.getDimensions();
    const [nodeScale, setNodeScale] = useState<number>(1);
    const detailsLevel = element.getGraph().getDetailsLevel();
    const [contentHeight, setContentHeight] = useState<number>();
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

    const onContextMenu = () => {

    };

    return (
      <g transform={`translate(0, ${(height - (contentHeight ?? 0)) / 2})`}>
        <g
          className={groupClassName}
          transform={`${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})`}
        >
          <NodeShadows />
          <g ref={hoverRef as LegacyRef<SVGGElement> | undefined} onClick={onSelect} onContextMenu={onContextMenu}>
            <CustomRectangle
              className={backgroundClassName}
              element={element}
              width={width}
              height={contentHeight ?? height}
              topLeftRadius={topLeftRadius}
              topRightRadius={topRightRadius}
              bottomLeftRadius={bottomLeftRadius}
              bottomRightRadius={bottomRightRadius}
            />
            <AiConfiguredLabel element={element} />
            <g>
              <foreignObject
                width={element.getDimensions().width}
                height={contentHeight || element.getDimensions().height}
              >
                <div ref={contentRef}>
                  {children}
                </div>
              </foreignObject>
            </g>
          </g>
        </g>
      </g>
    );
  }
);

const CompassNode: FunctionComponent<CompassNodeProps> = ({
  element,
  ...rest
}: CompassNodeProps) => {
  if (!isNode(element)) {
    throw new Error('CompassNode must be used only on Node elements');
  }
  return (
    <CompassNodeInner element={element as Node} {...rest} />
  );
};

export default CompassNode;
