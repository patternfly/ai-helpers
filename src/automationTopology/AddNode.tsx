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
import { PlusIcon } from '@patternfly/react-icons';

interface DefaultNodeProps {
  /** The graph node element to represent */
  element: GraphElement;
  /** Flag if the element selected. Part of WithSelectionProps */
  selected?: boolean;
  /** Function to call when the element should become selected (or deselected). Part of WithSelectionProps */
  onSelect?: OnSelect;
}
const SCALE_UP_TIME = 200;

type DefaultNodeInnerProps = Omit<DefaultNodeProps, 'element'> & { element: Node };

const AddNodeInner: FunctionComponent<DefaultNodeInnerProps> = observer(({ element }) => {
    const [hovered, hoverRef] = useHover();
    const { width, height } = element.getDimensions();
    const isHover = hovered;
    const [nodeScale, setNodeScale] = useState<number>(1);
    const detailsLevel = element.getGraph().getDetailsLevel();
    const focused = hovered;
   const scaleNode = focused && detailsLevel === ScaleDetailsLevel.low;
    const groupClassName = css(
      styles.topologyNode,
      isHover && 'pf-m-hover',
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

  return (
      <Layer id={focused ? TOP_LAYER : DEFAULT_LAYER}>
        <g
          className={groupClassName}
          transform={`${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})`}
        >
          <NodeShadows />
          <g ref={hoverRef as LegacyRef<SVGGElement> | undefined}>
            <Rectangle
              className={styles.topologyNodeBackground}
              element={element}
              width={width}
              height={height}
              cornerRadius={8}
            />
            <g transform={`translate(${4}, ${4})`}>
              <PlusIcon width={width - 8} height={height - 8} />
            </g>
          </g>
        </g>
      </Layer>
    );
  }
);

const AddNode: React.FunctionComponent<DefaultNodeProps> = ({
  element,
  ...rest
}: DefaultNodeProps) => {
  if (!isNode(element)) {
    throw new Error('DefaultNode must be used only on Node elements');
  }
  return (
    <AddNodeInner element={element as Node} {...rest} />
  );
};

export default AddNode;
