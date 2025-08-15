import React from "react";

interface PipelineStatsProps {
  nodes: any[];
  edges: any[];
}

export const PipelineStats: React.FC<PipelineStatsProps> = ({ nodes, edges }) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
      <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">Nodes:- {nodes.length}</span>
      <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">Edges:- {edges.length}</span>
    </div>
  );
};
