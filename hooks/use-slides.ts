"use client";

import { useReducer, useCallback } from "react";
import type { SlideDeck, SlidesState, SlidesStatus } from "@/types/slides";
import { generateSlides } from "@/lib/api";

// Action types
type SlidesAction =
  | { type: "GENERATE_START"; prompt: string }
  | { type: "GENERATE_SUCCESS"; deck: SlideDeck }
  | { type: "GENERATE_ERROR"; error: string }
  | { type: "SET_SLIDE_INDEX"; index: number }
  | { type: "NEXT_SLIDE" }
  | { type: "PREV_SLIDE" }
  | { type: "UPDATE_SLIDE_TITLE"; slideId: string; title: string }
  | {
      type: "UPDATE_SLIDE_CONTENT";
      slideId: string;
      contentIndex: number;
      text: string;
    }
  | { type: "RESET" };

const initialState: SlidesState = {
  deck: null,
  currentSlideIndex: 0,
  status: "idle",
  error: null,
  prompt: "",
};

function slidesReducer(state: SlidesState, action: SlidesAction): SlidesState {
  switch (action.type) {
    case "GENERATE_START":
      return {
        ...state,
        status: "loading",
        error: null,
        prompt: action.prompt,
      };

    case "GENERATE_SUCCESS":
      return {
        ...state,
        status: "success",
        deck: action.deck,
        currentSlideIndex: 0,
        error: null,
      };

    case "GENERATE_ERROR":
      return {
        ...state,
        status: "error",
        error: action.error,
      };

    case "SET_SLIDE_INDEX":
      return {
        ...state,
        currentSlideIndex: action.index,
      };

    case "NEXT_SLIDE":
      if (!state.deck) return state;
      return {
        ...state,
        currentSlideIndex: Math.min(
          state.currentSlideIndex + 1,
          state.deck.slides.length - 1
        ),
      };

    case "PREV_SLIDE":
      return {
        ...state,
        currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0),
      };

    case "UPDATE_SLIDE_TITLE":
      if (!state.deck) return state;
      return {
        ...state,
        deck: {
          ...state.deck,
          slides: state.deck.slides.map((slide) =>
            slide.id === action.slideId
              ? { ...slide, title: action.title }
              : slide
          ),
        },
      };

    case "UPDATE_SLIDE_CONTENT":
      if (!state.deck) return state;
      return {
        ...state,
        deck: {
          ...state.deck,
          slides: state.deck.slides.map((slide) =>
            slide.id === action.slideId
              ? {
                  ...slide,
                  content: slide.content.map((item, idx) =>
                    idx === action.contentIndex
                      ? { ...item, text: action.text }
                      : item
                  ),
                }
              : slide
          ),
        },
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useSlides() {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  const generate = useCallback(async (prompt: string) => {
    dispatch({ type: "GENERATE_START", prompt });
    try {
      const response = await generateSlides(prompt);
      if (response.success && response.data) {
        dispatch({ type: "GENERATE_SUCCESS", deck: response.data });
      } else {
        dispatch({ type: "GENERATE_ERROR", error: "Failed to generate slides" });
      }
    } catch (error) {
      dispatch({
        type: "GENERATE_ERROR",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, []);

  const regenerate = useCallback(() => {
    if (state.prompt) {
      generate(state.prompt);
    }
  }, [state.prompt, generate]);

  const nextSlide = useCallback(() => {
    dispatch({ type: "NEXT_SLIDE" });
  }, []);

  const prevSlide = useCallback(() => {
    dispatch({ type: "PREV_SLIDE" });
  }, []);

  const goToSlide = useCallback((index: number) => {
    dispatch({ type: "SET_SLIDE_INDEX", index });
  }, []);

  const updateSlideTitle = useCallback((slideId: string, title: string) => {
    dispatch({ type: "UPDATE_SLIDE_TITLE", slideId, title });
  }, []);

  const updateSlideContent = useCallback(
    (slideId: string, contentIndex: number, text: string) => {
      dispatch({ type: "UPDATE_SLIDE_CONTENT", slideId, contentIndex, text });
    },
    []
  );

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const currentSlide = state.deck?.slides[state.currentSlideIndex] ?? null;
  const totalSlides = state.deck?.slides.length ?? 0;

  return {
    // State
    deck: state.deck,
    currentSlide,
    currentSlideIndex: state.currentSlideIndex,
    totalSlides,
    status: state.status,
    error: state.error,
    prompt: state.prompt,

    // Computed
    isLoading: state.status === "loading",
    hasError: state.status === "error",
    hasDeck: state.status === "success" && state.deck !== null,
    isIdle: state.status === "idle",
    canGoNext: state.currentSlideIndex < totalSlides - 1,
    canGoPrev: state.currentSlideIndex > 0,

    // Actions
    generate,
    regenerate,
    nextSlide,
    prevSlide,
    goToSlide,
    updateSlideTitle,
    updateSlideContent,
    reset,
  };
}
