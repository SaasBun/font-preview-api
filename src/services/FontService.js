const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const { registerFont } = require("canvas");
const config = require("../config/config");
const { AppError } = require("../utils/errors");

class FontService {
  /**
   * Downloads and registers a font for use with canvas
   * @param {string} fontUrl - URL of the font file
   * @returns {Promise<string>} Path to the downloaded font file
   */
  static async downloadAndRegisterFont(fontUrl) {
    try {
      const fontResponse = await axios.get(fontUrl, {
        responseType: "arraybuffer",
      });
      const fontExtension = path.extname(fontUrl);
      const fontPath = path.join(
        config.paths.temp,
        `font-${Date.now()}${fontExtension}`
      );

      const fontFamily = `CustomFont-${Date.now()}`;

      await fs.writeFile(fontPath, fontResponse.data);
      registerFont(fontPath, { family: fontFamily });

      return fontPath;
    } catch (error) {
      throw new AppError("Failed to download or register font", 500);
    }
  }

  /**
   * Cleans up temporary font file
   * @param {string} fontPath - Path to the font file
   */
  static async cleanup(fontPath) {
    try {
      await fs.unlink(fontPath);
    } catch (error) {
      console.error("Font cleanup failed:", error);
    }
  }
}

module.exports = FontService;
