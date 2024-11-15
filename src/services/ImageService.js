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
    const canvas = createCanvas(config.canvas.width, config.canvas.height);
    const ctx = canvas.getContext("2d");

    // Clear canvas to transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configure text rendering
    ctx.fillStyle = "black";
    const fontStyle = isItalic ? "italic " : "";
    ctx.font = `${fontStyle}${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas;
  }
}

module.exports = ImageService;
