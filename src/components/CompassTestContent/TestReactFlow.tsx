import { useCallback, useRef } from "react";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Connection,
  OnConnectEnd,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./reactFlowOverrides.css"
import PFCardNode from "./PFCardNode";

const initialNodes = [
  {
    id: "0",
    type: "pfCard",
    data: {
      title: "Application Service",
      status: "Running",
      description:
        "A microservice handling user authentication and authorization.",
      details: [
        { term: "Version", description: "v2.1.4" },
        { term: "CPU Usage", description: "45%" },
        { term: "Memory", description: "2.1 GB" },
        { term: "Last Deployed", description: "2 hours ago" },
      ],
      actionText: "View Details",
      onAction: () => console.log("View details clicked"),
    },
    position: { x: 300, y: 50 },
  },
  {
    id: "1",
    type: "pfCard",
    data: {
      title: "Database Service",
      status: "Healthy",
      description: "PostgreSQL database cluster with high availability.",
      details: [
        { term: "Cluster Size", description: "3 nodes" },
        { term: "Storage", description: "500 GB" },
        { term: "Connections", description: "127 active" },
        { term: "Uptime", description: "99.9%" },
      ],
      actionText: "Monitor",
      onAction: () => console.log("Monitor clicked"),
    },
    position: { x: 700, y: 50 },
  },
  {
    id: "2",
    type: "input",
    data: { label: "Start Node" },
    position: { x: 0, y: 50 },
  },
  {
    id: '3',
    position: { x: 0, y: 150 },
    data: { label: 'plain node' }
  },
];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin: [number, number] = [0.5, 0];

const nodeTypes = {
  pfCard: PFCardNode,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e2-0", source: "2", target: "0" },
    { id: "e0-1", source: "0", target: "1" },
  ] as any);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          type: "default",
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0] as [number, number],
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [
          ...eds,
          {
            id,
            source: connectionState.fromNode?.id || "",
            target: id,
          },
        ]);
      }
    },
    [screenToFlowPosition]
  );

  return (
    <div
      className="wrapper"
      ref={reactFlowWrapper}
      style={{ height: "100%", width: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export const TestReactFlow = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
