import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const CustomNode5: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Date"
      icon={<CalendarIcon className="text-pink-600" size={16} />}
      className="border-pink-400"
      headerBgClass="bg-pink-100"
      headerBorderClass="border-pink-200"
      handles={[
        { type: "source", position: Position.Right, id: "date-output" },
      ]}
      resizable={false}
      minWidth={220}
      minHeight={100}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="date-picker" className="text-xs font-medium text-gray-700">
          Select Date:
        </Label>
        <Button
          variant="outline"
          className="nodrag justify-start text-left font-normal text-xs h-8"
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {data.date || "Pick a date"}
        </Button>
      </div>
    </BaseNode>
  );
};
