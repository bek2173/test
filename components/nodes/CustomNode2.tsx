import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Clock } from 'lucide-react';

export const CustomNode2: React.FC = ({ data }: any) => {
  const [value, setValue] = React.useState([data.delay || 1000]);
  
  return (
    <BaseNode
      title="Delay"
      icon={<Clock className="text-amber-600" size={16} />}
      className="border-amber-400"
      headerBgClass="bg-amber-100"
      headerBorderClass="border-amber-200"
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "output" },
      ]}
      minWidth={220}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="delay-time" className="text-xs">
          Delay (ms):
        </Label>
        <Slider
          id="delay-time"
          value={value}
          onValueChange={setValue}
          max={5000}
          step={100}
          className="nodrag"
        />
        <span className="text-xs text-gray-500">
          {value[0]}ms
        </span>
      </div>
    </BaseNode>
  );
};
