"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavigationProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function SlideNavigation({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: SlideNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-muted-foreground font-medium min-w-[80px] text-center">
        {currentIndex + 1} of {totalSlides}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
