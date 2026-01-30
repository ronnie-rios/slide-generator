"use client";

import { Button } from "@/components/ui/button";
import { SlideCard } from "./slide-card";
import { SlideNavigation } from "./slide-navigation";
import type { SlideDeck, Slide } from "@/types/slides";
import { RefreshCw, Download } from "lucide-react";

interface SlideViewerProps {
  deck: SlideDeck;
  currentSlide: Slide;
  currentSlideIndex: number;
  totalSlides: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onUpdateTitle: (slideId: string, title: string) => void;
  onUpdateContent: (slideId: string, contentIndex: number, text: string) => void;
  onRegenerate: () => void;
  onExport?: () => void;
  isRegenerating?: boolean;
}

export function SlideViewer({
  deck,
  currentSlide,
  currentSlideIndex,
  totalSlides,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onUpdateTitle,
  onUpdateContent,
  onRegenerate,
  onExport,
  isRegenerating = false,
}: SlideViewerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with deck title and actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{deck.deckTitle}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
            Regenerate
          </Button>
          {onExport && (
            <Button
              variant="outline"
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export PPTX
            </Button>
          )}
        </div>
      </div>

      {/* Current slide */}
      <SlideCard
        slide={currentSlide}
        onTitleChange={(title) => onUpdateTitle(currentSlide.id, title)}
        onContentChange={(index, text) =>
          onUpdateContent(currentSlide.id, index, text)
        }
      />

      {/* Navigation */}
      <SlideNavigation
        currentIndex={currentSlideIndex}
        totalSlides={totalSlides}
        onPrev={onPrev}
        onNext={onNext}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
      />

      {/* Hint */}
      <p className="text-center text-sm text-muted-foreground">
        Click on title or content to edit. Use arrow keys to navigate.
      </p>
    </div>
  );
}
