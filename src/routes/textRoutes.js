const express = require("express");
const router = express.Router();
const FontService = require("../services/FontService");
const ImageService = require("../services/ImageService");
const { validateTextRequest } = require("../utils/validators");

router.get("/generate-text", async (req, res, next) => {
  let fontPath;

  try {
    // Validate and parse request parameters
    const params = validateTextRequest(req.query);

    // Download and register font
    fontPath = await FontService.downloadAndRegisterFont(params.fontUrl);

    // Generate image
    const canvas = ImageService.createTextImage(params);

    // Send response
    res.setHeader("Content-Type", "image/png");
    canvas.createPNGStream().pipe(res);
  } catch (error) {
    next(error);
  } finally {
    // Cleanup temporary font file
    if (fontPath) {
      await FontService.cleanup(fontPath);
    }
  }
});

module.exports = router;
