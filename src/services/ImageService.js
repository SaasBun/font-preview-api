const { createCanvas } = require("canvas");
const config = require("../config/config");

class ImageService {
  /**
   * Creates a canvas with the specified text
   * @param {Object} params - Text rendering parameters
   * @param {string} params.text - Text to render
   * @param {boolean} params.isItalic - Whether to render in italic
   * @param {number} params.fontSize - Font size in pixels
   * @returns {Canvas} Canvas instance with rendered text
   */
  static createTextImage({ text, isItalic, fontSize, fontFamily }) {
    // Create a temporary canvas for measuring text
    const measureCanvas = createCanvas(1, 1);
    const measureCtx = measureCanvas.getContext("2d");

    // Configure font for measurement
    const fontStyle = isItalic ? "italic " : "";
    measureCtx.font = `${fontStyle}${fontSize}px ${fontFamily}`;

    // Measure text dimensions
    const metrics = measureCtx.measureText(text);

    // Calculate the actual height (including ascenders and descenders)
    const actualHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const actualWidth = metrics.width;

    // Create the final canvas with exact dimensions
    const canvas = createCanvas(actualWidth, actualHeight);
    const ctx = canvas.getContext("2d");

    // Clear canvas (although it's new, this ensures transparency)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configure text rendering
    ctx.fillStyle = "black";
    ctx.font = `${fontStyle}${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "alphabetic";

    // Draw text at the baseline position
    ctx.fillText(text, 0, metrics.actualBoundingBoxAscent);

    return canvas;
  }
}

module.exports = ImageService;
