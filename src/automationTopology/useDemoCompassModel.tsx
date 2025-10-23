import { useMemo } from 'react';
import { EdgeModel, NodeModel, NodeShape } from '@patternfly/react-topology';
import {
  ADD_NODE_TYPE,
  COMPASS_AGENT_WIDTH,
  COMPASS_EDGE_TYPE,
  COMPASS_NODE_HEIGHT,
  COMPASS_PLATFORM_WIDTH,
  FINAL_EDGE_TYPE,
  PLATFORM_NODE_TYPE,
  AGENT_NODE_TYPE
} from './const';
import { AnsibleObjectType, AnsibleTypes } from './type.ts';

export const useDemoCompassModel = (ansibleObjects: AnsibleObjectType[]): { nodes: NodeModel[]; edges: EdgeModel[] } => {
  const nodes = useMemo(() => {
    const modelNodes = ansibleObjects.map<NodeModel>((ansibleObject: AnsibleObjectType) => {
      return {
        id: ansibleObject.id,
        type: ansibleObject.type === AnsibleTypes.AUTOMATION_PLATFORM ? PLATFORM_NODE_TYPE : AGENT_NODE_TYPE,
        label: ansibleObject.type,
        width: ansibleObject.type  === AnsibleTypes.AUTOMATION_PLATFORM ? COMPASS_PLATFORM_WIDTH : COMPASS_AGENT_WIDTH,
        height: COMPASS_NODE_HEIGHT,
        shape: NodeShape.rect,
        data: ansibleObject
      }
    });

    const addNode: NodeModel = {
      id: 'add-node',
      type: ADD_NODE_TYPE,
      width: 32,
      height: 32,
      shape: NodeShape.rect,
    };

    return [...modelNodes, addNode];
  }, []);

  const edges = useMemo(() => {
    const edge1: EdgeModel = {
      id: 'edge-1-2',
      source: nodes[0].id,
      target: nodes[1].id,
      type: COMPASS_EDGE_TYPE
    };
    const edge2: EdgeModel = {
      id: 'edge-2-3',
      source: nodes[1].id,
      target: nodes[2].id,
      type: COMPASS_EDGE_TYPE
    };
    const finalEdge: EdgeModel = {
      id: 'edge-final',
      source: nodes.slice(-2)[0].id,
      target: nodes.slice(-1)[0].id,
      type: FINAL_EDGE_TYPE
    };

    return [edge1, edge2, finalEdge] as EdgeModel[];
  }, [nodes]);

  return { nodes, edges };
};
