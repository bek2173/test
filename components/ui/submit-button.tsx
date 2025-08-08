// This file is not strictly needed as the button is directly in page.tsx
    // but it demonstrates how shadcn components would be imported.
    import { Button } from "@/components/ui/button";

    interface SubmitButtonProps {
      onClick: () => void;
      children: React.ReactNode;
    }

    export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, children }) => {
      return (
        <Button onClick={onClick}>
          {children}
        </Button>
      );
    };
