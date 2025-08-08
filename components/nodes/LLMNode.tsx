import React from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Brain } from 'lucide-react';
import { Label } from "@/components/ui/label";

export const LLMNode: React.FC = ({ data }: any) => {
  return (
    <BaseNode
      title="LLM"
      icon={<Brain className="text-violet-600" size={16} />}
      className="border-violet-400"
      headerBgClass="bg-violet-100"
      headerBorderClass="border-violet-200"
      handles={[
        { type: "target", position: Position.Left, id: "prompt" },
        { type: "source", position: Position.Right, id: "response" },
      ]}
      minWidth={220}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="llm-model" className="text-xs font-medium text-gray-700">
          Model
        </Label>
        <Select defaultValue={data.model || "gpt-4o"}>
          <SelectTrigger id="llm-model" className="nodrag text-xs h-8">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
            <SelectItem value="llama-3">Llama 3</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="llm-prompt" className="text-xs font-medium text-gray-700 mt-2">
          Prompt
        </Label>
        <Textarea
          id="llm-prompt"
          name="llm-prompt"
          defaultValue={data.prompt || "Write a short story about..."}
          className="nodrag text-xs h-20 resize-y"
        />
      </div>
    </BaseNode>
  );
};
