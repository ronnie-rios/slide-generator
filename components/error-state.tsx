"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  onReset?: () => void;
}

export function ErrorState({ message, onRetry, onReset }: ErrorStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="flex justify-center gap-4 mt-6">
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Try Again
          </Button>
        )}
        {onReset && (
          <Button onClick={onReset} variant="outline">
            Start Over
          </Button>
        )}
      </div>
    </div>
  );
}
