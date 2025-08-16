import React from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  nodeCount: number;
  edgeCount: number;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  isLoading,
  nodeCount,
  edgeCount,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-200 flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <PlayIcon className="h-4 w-4" />
      )}
      Submit the Pipeline ({nodeCount} nodes, {edgeCount} edges)
    </Button>
  );
};
