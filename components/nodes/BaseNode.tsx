import React from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { cn } from "@/lib/utils";

interface BaseNodeProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  handles?: {
    type: "source" | "target";
    position: Position;
    id?: string;
    style?: React.CSSProperties;
  }[];
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  icon?: React.ReactNode;
  headerBgClass?: string; // New prop for header background color
  headerBorderClass?: string; // New prop for header border color
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  title,
  children,
  className,
  handles = [],
  resizable = true,
  minWidth = 150,
  minHeight = 100,
  icon,
  headerBgClass = "bg-gray-50", // Default to gray
  headerBorderClass = "border-gray-200", // Default to gray
}) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-lg shadow-md border-2 overflow-hidden",
        className // This will control the main node border color
      )}
      style={{ minWidth: `${minWidth}px`, minHeight: `${minHeight}px` }}
    >
      {resizable && (
        <NodeResizer
          minWidth={minWidth}
          minHeight={minHeight}
          isVisible={true}
          lineClassName="border-blue-500"
          handleClassName="w-2 h-2 bg-blue-500 rounded-full border border-blue-700"
        />
      )}
      <div className={cn(
        "flex items-center gap-2 p-3 border-b",
        headerBgClass,
        headerBorderClass
      )}>
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-3 text-sm">{children}</div>

      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${handle.type}-${handle.position}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            background: "#64748b", // slate-500
            width: 8,
            height: 8,
            border: "1px solid #475569", // slate-600
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};
