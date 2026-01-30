"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SlideContent } from "./slide-content";
import type { Slide } from "@/types/slides";

interface SlideCardProps {
  slide: Slide;
  onTitleChange: (title: string) => void;
  onContentChange: (contentIndex: number, text: string) => void;
}

export function SlideCard({
  slide,
  onTitleChange,
  onContentChange,
}: SlideCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  // Ref callback: focus + select synchronously on mount (no useEffect needed)
  const focusRef = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      node.focus();
      node.select();
    }
  }, []);

  // Initialize local state from prop at the moment editing starts
  const startEditingTitle = () => {
    setEditTitle(slide.title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    if (editTitle !== slide.title) {
      onTitleChange(editTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSave();
    }
    if (e.key === "Escape") {
      setIsEditingTitle(false);
    }
  };

  return (
    <Card className="w-full min-h-[400px]">
      <CardHeader>
        {isEditingTitle ? (
          <input
            ref={focusRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold p-2 border rounded bg-background w-full"
          />
        ) : (
          <h2
            onClick={startEditingTitle}
            className="text-2xl font-bold cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
            title="Click to edit"
          >
            {slide.title}
          </h2>
        )}
      </CardHeader>
      <CardContent>
        <SlideContent content={slide.content} onContentChange={onContentChange} />
      </CardContent>
    </Card>
  );
}
