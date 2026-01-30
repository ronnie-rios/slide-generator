import PptxGenJS from "pptxgenjs";
import type { SlideDeck } from "@/types/slides";

export async function exportToPptx(deck: SlideDeck): Promise<void> {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.title = deck.deckTitle;
  pptx.author = "Slide Deck Generator";

  // Define slide layout
  pptx.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pptx.layout = "CUSTOM";

  // Create each slide
  deck.slides.forEach((slideData) => {
    const slide = pptx.addSlide();

    // Add title
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 0.8,
      fontSize: 28,
      bold: true,
      color: "1a1a1a",
    });

    // Process content
    const bullets = slideData.content.filter((c) => c.type === "bullet");
    const paragraphs = slideData.content.filter((c) => c.type === "paragraph");

    let yPosition = 1.3;

    // Add paragraphs first
    paragraphs.forEach((p) => {
      slide.addText(p.text, {
        x: 0.5,
        y: yPosition,
        w: 9,
        h: 0.5,
        fontSize: 16,
        color: "333333",
      });
      yPosition += 0.6;
    });

    // Add bullets
    if (bullets.length > 0) {
      const bulletText = bullets.map((b) => ({
        text: b.text,
        options: { bullet: true, fontSize: 16, color: "333333" as const },
      }));

      slide.addText(bulletText, {
        x: 0.5,
        y: yPosition,
        w: 9,
        h: 4 - yPosition,
        valign: "top",
      });
    }
  });

  // Generate and download the file
  const fileName = `${deck.deckTitle.replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;
  await pptx.writeFile({ fileName });
}
