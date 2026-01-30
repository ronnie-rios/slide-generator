"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export function PromptForm({ onSubmit, isLoading = false }: PromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Slide Deck</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your prompt... (e.g., 'Build a presentation for an upcoming vehicle convoy from Austin, TX to Fort Hood, TX')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            rows={4}
            className="resize-none"
          />
          <Button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Generating..." : "Generate Slides"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
