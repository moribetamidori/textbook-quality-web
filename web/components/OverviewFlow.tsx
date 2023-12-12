import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "reactflow/dist/style.css";
import ReactFlow, { addEdge, MiniMap, Controls, Background } from "reactflow";
import { useNodesState } from "reactflow";
import { useEdgesState } from "reactflow";
import StartNode from "./Nodes/StartNode";
import GenerateNode from "./Nodes/GenerateNode";
import AugmentNode from "./Nodes/AugmentNode";
import TextbookNode from "./Nodes/TextbookNode";
import Sidebar from "./Sidebar";
import { generateNodes } from "@/util/nodeHelper";
import GenerateNodeProperties from "./Properties/GenerateNodeProperties";
import { StatusContext } from "@/contexts/StatusContext";
import SubjectNode from "./Nodes/SubjectNode";
import DownloadNode from "./Nodes/DownloadNode";
const OverviewFlow = () => {
  const { numAugmentedAgents, setNumAugmentedAgents } =
    useContext(StatusContext);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [sidebarContent, setSidebarContent] = useState<React.ReactNode | null>(
    null
  );

  const onElementClick = (event: React.MouseEvent, element: any) => {
    setSidebarOpen(true);
    setSelectedNode(element);
    if (element.type === "generate") {
      setSidebarContent(
        <GenerateNodeProperties
          numAugmentedAgents={numAugmentedAgents}
          setNumAugmentedAgents={setNumAugmentedAgents}
        />
      );
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedNode(null);
    setSidebarContent(null);
  };

  const nodeTypes = useMemo(
    () => ({
      generate: (node: any) => (
        <GenerateNode {...node} setNumAgents={setNumAugmentedAgents} />
      ),
      augment: AugmentNode,
      textbook: TextbookNode,
      start: StartNode,
      subject: SubjectNode,
      download: DownloadNode,
    }),
    [setNumAugmentedAgents]
  );

  const onInit = (reactFlowInstance: any) => console.log("flow loaded:");
  const { nodes: initialNodes, edges: initialEdges } =
    generateNodes(numAugmentedAgents);

  const [generatedElements, setGeneratedElements] = useState({
    nodes: initialNodes,
    edges: initialEdges,
  });

  useEffect(() => {
    const generatedElements = generateNodes(numAugmentedAgents);
    setGeneratedElements(generatedElements);
    setNodes(generatedElements.nodes);
    setEdges(generatedElements.edges);
  }, [numAugmentedAgents]);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    generatedElements.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    generatedElements.edges
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onElementClick}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <Background color="#6C00FF" gap={16} />
      </ReactFlow>
      {sidebarOpen && (
        <Sidebar
          open={sidebarOpen}
          node={selectedNode}
          content={sidebarContent}
          onClose={closeSidebar}
          type={selectedNode?.type}
        />
      )}
    </>
  );
};

export default OverviewFlow;
