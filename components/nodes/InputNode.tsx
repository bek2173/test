import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Input } from "@/components/ui/input";
import { ArrowDownToLine } from 'lucide-react';
import { Label } from "@/components/ui/label";

export const InputNode: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Input"
      icon={<ArrowDownToLine className="text-emerald-600" size={16} />}
      className="border-emerald-400" // Main node border
      headerBgClass="bg-emerald-100" // Header background
      headerBorderClass="border-emerald-200" // Header bottom border
      handles={[
        { type: "source", position: Position.Right, id: "output" },
      ]}
      resizable={false}
      minWidth={220}
      minHeight={100}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-value" className="text-xs font-medium text-gray-700">
          Data input source
        </Label>
        <Input
          id="input-value"
          name="input-value"
          defaultValue={data.value || "Default Input"}
          className="nodrag text-xs h-8"
        />
      </div>
    </BaseNode>
  );
};
