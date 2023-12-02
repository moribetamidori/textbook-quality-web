import React, { useCallback } from "react";
import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";
import { useNodesState } from "reactflow";
import { useEdgesState } from "reactflow";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import GenerateNode from "./GenerateNode";

import "reactflow/dist/style.css";
import AugmentNode from "./AugmentNode";
import TextbookNode from "./TextbookNode";

const nodeTypes = {
  generate: GenerateNode,
  augment: AugmentNode,
  textbook: TextbookNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        label: node.data.label ?? "", // ensure label is always a string
      },
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      {/* <MiniMap style={minimapStyle} zoomable pannable /> */}
      {/* <Controls /> */}
      <Background color="#6C00FF" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
