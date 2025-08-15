import React, { useState, useRef, useEffect, useCallback } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";
import { Textarea } from "@/components/ui/textarea";
import { Type } from 'lucide-react';
import { Label } from "@/components/ui/label";

const VARIABLE_REGEX = /\s*\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}\s*/g;

export const TextNode: React.FC = ({ id, data }: any) => {
  const [text, setText] = useState(data.initialText || "");
  const [dynamicHandles, setDynamicHandles] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const updateTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      updateNodeInternals(id); // Notify React Flow of size change
    }
  }, [id, updateNodeInternals]);

  useEffect(() => {
    updateTextareaHeight();
  }, [text, updateTextareaHeight]);

  useEffect(() => {
    const matches = Array.from(text.matchAll(VARIABLE_REGEX));
    const newHandles = Array.from(
      new Set(matches.map((match) => (match as RegExpMatchArray)[1]))
    );
    setDynamicHandles(newHandles);
    updateNodeInternals(id); // Notify React Flow of handle changes
  }, [text, id, updateNodeInternals]);

  const baseHandles: { type: "source" | "target"; position: Position; id?: string; style?: React.CSSProperties }[] = [
    { type: "source", position: Position.Right, id: "output" },
  ];

  const allHandles = [
    ...baseHandles,
    ...dynamicHandles.map((variable, index) => ({
      type: "target" as "target",
      position: Position.Left as Position,
      id: `var-${variable}`,
      style: { top: 40 + index * 25, left: -5 }, // Adjust position dynamically
    })),
  ];

  return (
    <BaseNode
      title="Text"
      icon={<Type className="text-sky-600" size={16} />}
      className="border-sky-400"
      headerBgClass="bg-sky-100"
      headerBorderClass="border-sky-200"
      handles={allHandles}
      minWidth={220}
      minHeight={100}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="text-input" className="text-xs font-medium text-gray-700">
          Text Content
        </Label>
        <Textarea
          id="text-input"
          name="text-input"
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="nodrag text-xs resize-none overflow-hidden"
          rows={1} // Start with 1 row, height will adjust
        />
        {dynamicHandles.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            Variables: {dynamicHandles.join(", ")}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
