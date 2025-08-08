import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpFromLine } from 'lucide-react';
import { Label } from "@/components/ui/label";

export const OutputNode: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Output"
      icon={<ArrowUpFromLine className="text-rose-600" size={16} />}
      className="border-rose-400"
      headerBgClass="bg-rose-100"
      headerBorderClass="border-rose-200"
      handles={[{ type: "target", position: Position.Left, id: "input" }]}
      resizable={false}
      minWidth={220}
      minHeight={100}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="output-display" className="text-xs font-medium text-gray-700">
          Data output destination
        </Label>
        <Textarea
          id="output-display"
          name="output-display"
          readOnly
          defaultValue={data.result || "No output yet"}
          className="nodrag text-xs h-16 resize-none"
        />
      </div>
    </BaseNode>
  );
};
