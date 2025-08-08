import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter } from 'lucide-react';

export const CustomNode1: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Filter"
      icon={<Filter className="text-orange-600" size={16} />}
      className="border-orange-400"
      headerBgClass="bg-orange-100"
      headerBorderClass="border-orange-200"
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "true" },
        { type: "source", position: Position.Right, id: "false", style: { top: '70%' } },
      ]}
      minWidth={220}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Switch id="filter-mode" className="nodrag" />
          <Label htmlFor="filter-mode" className="text-xs">
            Strict Mode
          </Label>
        </div>
        <p className="text-xs text-gray-500">Filters data based on a condition.</p>
      </div>
    </BaseNode>
  );
};
