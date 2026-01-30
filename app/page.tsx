"use client";

import { PromptForm } from "@/components/prompt-form";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { SlideViewer } from "@/components/slides";
import { useSlides } from "@/hooks/use-slides";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
export default function Home() {
  const {
    deck,
    currentSlide,
    currentSlideIndex,
    totalSlides,
    status,
    error,
    isLoading,
    hasError,
    hasDeck,
    canGoNext,
    canGoPrev,
    generate,
    regenerate,
    nextSlide,
    prevSlide,
    updateSlideTitle,
    updateSlideContent,
    reset,
  } = useSlides();

  // Enable keyboard navigation when viewing slides
  useKeyboardNavigation({
    onNext: nextSlide,
    onPrev: prevSlide,
    enabled: hasDeck && !isLoading,
  });

  const handleExport = async () => {
    if (deck) {
      const { exportToPptx } = await import("@/lib/export-pptx");
      await exportToPptx(deck);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Show prompt form when idle or after reset */}
        {status === "idle" && <PromptForm onSubmit={generate} />}

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Error state */}
        {hasError && (
          <ErrorState
            message={error || "Something went wrong"}
            onRetry={regenerate}
            onReset={reset}
          />
        )}

        {/* Slide viewer */}
        {hasDeck && currentSlide && deck && (
          <SlideViewer
            deck={deck}
            currentSlide={currentSlide}
            currentSlideIndex={currentSlideIndex}
            totalSlides={totalSlides}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={prevSlide}
            onNext={nextSlide}
            onUpdateTitle={updateSlideTitle}
            onUpdateContent={updateSlideContent}
            onRegenerate={regenerate}
            onExport={handleExport}
            isRegenerating={false}
          />
        )}

        {/* Back to prompt button when viewing slides */}
        {hasDeck && (
          <div className="mt-8 text-center">
            <button
              onClick={reset}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Create new presentation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
