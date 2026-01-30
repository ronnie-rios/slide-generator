// API Response Types
export interface SlideContent {
  type: "bullet" | "paragraph";
  text: string;
}

export interface Slide {
  id: string;
  title: string;
  content: SlideContent[];
}

export interface SlideDeck {
  deckTitle: string;
  slides: Slide[];
}

export interface GenerateSlidesResponse {
  success: boolean;
  data: SlideDeck;
}

// API Request Types
export interface GenerateSlidesRequest {
  prompt: string;
  model: "gpt-4o-2024-08-06";
}

// Application State Types
export type SlidesStatus = "idle" | "loading" | "success" | "error";

export interface SlidesState {
  deck: SlideDeck | null;
  currentSlideIndex: number;
  status: SlidesStatus;
  error: string | null;
  prompt: string;
}
