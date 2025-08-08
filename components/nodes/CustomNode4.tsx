import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckSquare } from 'lucide-react';

export const CustomNode4: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="Validator"
      icon={<CheckSquare className="text-indigo-600" size={16} />}
      className="border-indigo-400"
      headerBgClass="bg-indigo-100"
      headerBorderClass="border-indigo-200"
      handles={[
        { type: "target", position: Position.Left, id: "input" },
        { type: "source", position: Position.Right, id: "valid" },
        { type: "source", position: Position.Right, id: "invalid", style: { top: '70%' } },
      ]}
      minWidth={220}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="required-field" className="nodrag" />
          <Label htmlFor="required-field" className="text-xs">
            Required Field
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="email-validation" className="nodrag" />
          <Label htmlFor="email-validation" className="text-xs">
            Email Format
          </Label>
        </div>
        <p className="text-xs text-gray-500">Validates input against criteria.</p>
      </div>
    </BaseNode>
  );
};
