import { FunctionComponent, useEffect, useState } from 'react';
import { Flex, FlexItem } from '@patternfly/react-core';
import {
  defaultElementFactory,
  GRAPH_AREA_SELECTED_EVENT,
  GraphAreaSelectedEventListener,
  observer,
  SELECTION_EVENT,
  SelectionEventListener,
  TopologySideBar,
  TopologyView,
  useEventListener,
  useVisualizationController,
  Visualization,
  VisualizationProvider,
  VisualizationSurface
} from '@patternfly/react-topology';
import DemoControlBar from './ControlBar';
import { useDemoCompassModel } from './useDemoCompassModel';
import compassComponentFactory from './components/compassComponentFactory.tsx';
import compassLayoutFactory from './compassLayoutFactory';
import { AnsibleObjectType, AnsibleSubTypes, AnsibleTypes } from './type.ts';
import OptionsViewBar from './OptionsViewBar';

import './css/compass-topology-components.css';

const demoAnsibleObjects: AnsibleObjectType[] = [
  {
    id: `aap-node-1`,
    type: AnsibleTypes.AUTOMATION_PLATFORM,
    aiConfigured: true,
    subType: AnsibleSubTypes.TRIGGER,
    description: 'Trigger event shows need to create VM',
    integrations: ['ansible-automation-platform', 'aws'],
    action: 'Run Playbook',
    playbook: 'VM_Deployment'
  },
  {
    id: `aap-node-2`,
    type: AnsibleTypes.ANALYSIS_AGENT,
    aiConfigured: true,
    subType: AnsibleSubTypes.AGENT,
    description: 'Analyze region expenses, resource availability, and organizational policies',
    integrations: ['ansible-automation-platform', 'aws'],
    action: 'Run Playbook',
    playbook: 'VM_Deployment',
  },
  {
    id: `aap-node-3`,
    type: AnsibleTypes.AUTOMATION_PLATFORM,
    aiConfigured: true,
    subType: AnsibleSubTypes.APPLICATION,
    description: 'Create VM playbook',
    integrations: ['ansible-automation-platform', 'aws'],
    action: 'Run Playbook',
    playbook: 'VM_Deployment',
  }
];

const TopologyViewComponent: FunctionComponent = observer(() => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const controller = useVisualizationController();
  const hasGraph = controller.hasGraph();
  const dataModel = useDemoCompassModel(demoAnsibleObjects);

  useEffect(() => {
    const model = {
      graph: {
        id: 'g1',
        type: 'graph',
        layout: 'Dagre'
      },
      ...dataModel
    };

    controller.fromModel(model, true);
  }, [controller, dataModel]);

  // Once we have the graph, run the layout. This ensures the graph size is set (by the initial size observation in VisualizationSurface)
  // and the graph is centered by the layout.
  useEffect(() => {
    if (hasGraph) {
      controller.getGraph().layout();
    }
  }, [hasGraph, controller]);

  useEventListener<SelectionEventListener>(SELECTION_EVENT, (ids) => {
    const updatedIds = ids.filter(
      (id) => dataModel.nodes.find((n) => n.id === id) || dataModel.edges.find((n) => n.id === id)
    );
    setSelectedIds(updatedIds);
  });

  useEventListener<GraphAreaSelectedEventListener>(
    GRAPH_AREA_SELECTED_EVENT,
    ({ graph, modifier, startPoint, endPoint }) => {
      if (modifier === 'ctrlKey') {
        graph.zoomToSelection(startPoint, endPoint);
        return;
      }
      if (modifier === 'shiftKey') {
        const selections = graph.nodesInSelection(startPoint, endPoint);
        setSelectedIds(
          selections.reduce<string[]>((acc, node) => {
            if (!node.isGroup()) {
              acc.push(node.getId());
            }
            return acc;
          }, [])
        );
      }
    }
  );

  useEffect(() => {
    let resizeTimeout: number | null | undefined;

    if (selectedIds[0]) {
      const selectedNode = controller.getNodeById(selectedIds[0]);
      if (selectedNode) {
        // Use a timeout in order to allow the side panel to be shown and window size recomputed
        resizeTimeout = setTimeout(() => {
          controller.getGraph().panIntoView(selectedNode, { offset: 20, minimumVisible: 100 });
          resizeTimeout = null;
        }, 500);
      }
    }
    return () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [selectedIds, controller]);

  const topologySideBar = (
    <TopologySideBar show={!!selectedIds?.length} onClose={() => setSelectedIds([])}>
      <div style={{ marginTop: 27, marginLeft: 20 }}>{selectedIds?.[0]}</div>
    </TopologySideBar>
  );

  return (
    <Flex direction={{ default: 'column' }} spacer={{ default: "spacerSm" }} style={{ height: '100%' }}>
      <FlexItem>
        <OptionsViewBar />
      </FlexItem>
      <FlexItem flex={{ default: 'flex_1' }} className="compass__automation-topology--view">
        <TopologyView controlBar={<DemoControlBar />}>
          <VisualizationSurface state={{ selectedIds }} />
        </TopologyView>
        {topologySideBar}
      </FlexItem>
    </Flex>
  );
});

export const CompassAutomationTopology: FunctionComponent = () => {
  const controller = new Visualization();
  controller.registerElementFactory(defaultElementFactory);
  controller.registerLayoutFactory(compassLayoutFactory);
  controller.registerComponentFactory(compassComponentFactory);
  controller.setFitToScreenOnLayout(true);

  return (
    <VisualizationProvider controller={controller}>
      <TopologyViewComponent />
    </VisualizationProvider>
  );
};
