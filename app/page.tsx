"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { InputNode } from "@/components/nodes/InputNode";
import { OutputNode } from "@/components/nodes/OutputNode";
import { LLMNode } from "@/components/nodes/LLMNode";
import { TextNode } from "@/components/nodes/TextNode";
import { CustomNode1 } from "@/components/nodes/CustomNode1";
import { CustomNode2 } from "@/components/nodes/CustomNode2";
import { CustomNode3 } from "@/components/nodes/CustomNode3";
import { CustomNode4 } from "@/components/nodes/CustomNode4";
import { CustomNode5 } from "@/components/nodes/CustomNode5";
import { NodeLibrary } from "@/components/NodeLibrary";
import { SubmitButton } from "@/components/SubmitButton";
import { PipelineStats } from "@/components/PipelineStats";
import { useToast } from "@/hooks/use-toast"; // Corrected import for useToast

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
  customNode1: CustomNode1,
  customNode2: CustomNode2,
  customNode3: CustomNode3,
  customNode4: CustomNode4,
  customNode5: CustomNode5,
};

type CustomNodeData = {
  label: string;
  initialText?: string;
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 100, y: 200 },
    data: { label: "Input" },
  },
  {
    id: "2",
    type: "textNode",
    position: { x: 400, y: 200 },
    data: { label: "Text", initialText: "Hello {{ input }}!" },
  },
  {
    id: "3",
    type: "llmNode",
    position: { x: 700, y: 200 },
    data: { label: "LLM" },
  },
  {
    id: "4",
    type: "outputNode",
    position: { x: 1000, y: 200 },
    data: { label: "Output" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "output",
    targetHandle: "var-input",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "output",
    targetHandle: "prompt",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "response",
    targetHandle: "input",
  },
];
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
let nodeId = 5; // Start after our initial nodes
const getId = () => `node_${nodeId++}`;

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project, screenToFlowPosition } = useReactFlow();
  const { toast } = useToast(); // Use the useToast hook

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowWrapper.current
        ? project(screenToFlowPosition({
            x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
            y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
          }))
        : { x: 0, y: 0 };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type.replace("Node", "")}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, screenToFlowPosition, setNodes]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      // Always get the text response first for debugging, regardless of .ok status
      const rawBackendResponseText = await response.text();

      if (!response.ok) {
        console.error("Backend error response (status not OK):", response.status, rawBackendResponseText);
        toast({
          title: "Error from Backend",
          description: `Status: ${response.status}. Details: ${rawBackendResponseText.substring(0, 100)}...`,
          variant: "destructive"
        });
        return; // Exit early if response is not OK
      }

      let result;
      try {
        result = JSON.parse(rawBackendResponseText);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.error("Raw response that caused parsing error:", rawBackendResponseText);
        toast({
          title: "Parsing Error",
          description: `Failed to parse backend response. Raw: ${rawBackendResponseText.substring(0, 100)}...`,
          variant: "destructive"
        });
        return; // Exit early if parsing fails
      }
      
      toast({
        title: "Pipeline Analysis",
        description: `Nodes: ${result.num_nodes} | Edges: ${result.num_edges} | Is DAG: ${result.is_dag ? "Yes ✓" : "No ✗"}`,
        variant: result.is_dag ? "default" : "destructive"
      });
    } catch (error) {
      console.error("Error in API route (request or fetch setup):", error);
      toast({
        title: "Network Error",
        description: `Could not connect to backend: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges, toast]);

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar - Node Library */}
      <NodeLibrary />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pipeline Editor</h1>
            <p className="text-sm text-gray-600">Build and visualize your data processing pipeline</p>
          </div>
          <div className="flex items-center gap-4">
            <PipelineStats nodes={nodes} edges={edges} />
            <SubmitButton 
              onClick={handleSubmit} 
              isLoading={isSubmitting}
              nodeCount={nodes.length}
              edgeCount={edges.length}
            />
          </div>
        </div>

        {/* Flow Canvas */}
        <div ref={reactFlowWrapper} className="flex-1 h-full w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            maxZoom={4}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#e2e8f1" />
            <Controls className="bg-white shadow-md rounded-md border border-gray-200" />
            <MiniMap 
              nodeStrokeWidth={3}
              zoomable
              pannable
              className="rounded-md border border-gray-200 shadow-md"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
