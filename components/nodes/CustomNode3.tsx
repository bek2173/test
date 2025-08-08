import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Merge } from 'lucide-react';

export const CustomNode3: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Merge"
      icon={<Merge className="text-teal-600" size={16} />}
      className="border-teal-400"
      headerBgClass="bg-teal-100"
      headerBorderClass="border-teal-200"
      handles={[
        { type: "target", position: Position.Left, id: "input-a", style: { top: '30%' } },
        { type: "target", position: Position.Left, id: "input-b", style: { top: '70%' } },
        { type: "source", position: Position.Right, id: "output" },
      ]}
      minWidth={220}
    >
      <div className="flex flex-col gap-2">
        <Label className="text-xs">Merge Strategy:</Label>
        <RadioGroup defaultValue="concat" className="nodrag text-xs">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concat" id="concat" />
            <Label htmlFor="concat">Concatenate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="combine" id="combine" />
            <Label htmlFor="combine">Combine Objects</Label>
          </div>
        </RadioGroup>
      </div>
    </BaseNode>
  );
};
