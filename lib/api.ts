import type { GenerateSlidesResponse } from "@/types/slides";

export async function generateSlides(
  prompt: string
): Promise<GenerateSlidesResponse> {
  const response = await fetch("/api/generate-slides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error: ${response.status}`);
  }

  return response.json();
}
