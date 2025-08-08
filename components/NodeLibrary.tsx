"use client";

import React from "react";
import { ArrowDownToLine, ArrowUpFromLine, Brain, Type, Filter, Clock, Merge, CheckSquare, CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NodeItemProps {
  type: string;
  label: string;
  icon: React.ReactNode;
  iconColorClass: string;
  borderColorClass: string;
}

const NodeItem: React.FC<NodeItemProps> = ({ type, label, icon, iconColorClass, borderColorClass }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-white shadow-sm cursor-grab transition-all duration-200",
        "hover:bg-gray-50 hover:shadow-md",
        `hover:border-${borderColorClass}` // Dynamic hover border
      )}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className={cn("flex-shrink-0", iconColorClass)}>{icon}</div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
  );
};

export const NodeLibrary: React.FC = () => {
  return (
    <aside className="w-64 p-4 border-r border-gray-200 bg-gray-50 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Node Library</h2>
      <p className="text-sm text-gray-600 mb-4">Drag or click to add nodes</p>
      <div className="flex flex-col gap-3">
        <NodeItem type="inputNode" label="Input" icon={<ArrowDownToLine size={18} />} iconColorClass="text-emerald-600" borderColorClass="emerald-400" />
        <NodeItem type="outputNode" label="Output" icon={<ArrowUpFromLine size={18} />} iconColorClass="text-rose-600" borderColorClass="rose-400" />
        <NodeItem type="llmNode" label="LLM" icon={<Brain size={18} />} iconColorClass="text-violet-600" borderColorClass="violet-400" />
        <NodeItem type="textNode" label="Text" icon={<Type size={18} />} iconColorClass="text-sky-600" borderColorClass="sky-400" />
        <NodeItem type="customNode1" label="Filter" icon={<Filter size={18} />} iconColorClass="text-orange-600" borderColorClass="orange-400" />
        <NodeItem type="customNode2" label="Delay" icon={<Clock size={18} />} iconColorClass="text-amber-600" borderColorClass="amber-400" />
        <NodeItem type="customNode3" label="Merge" icon={<Merge size={18} />} iconColorClass="text-teal-600" borderColorClass="teal-400" />
        <NodeItem type="customNode4" label="Validator" icon={<CheckSquare size={18} />} iconColorClass="text-indigo-600" borderColorClass="indigo-400" />
        <NodeItem type="customNode5" label="Date" icon={<CalendarIcon size={18} />} iconColorClass="text-pink-600" borderColorClass="pink-400" />
      </div>
    </aside>
  );
};
