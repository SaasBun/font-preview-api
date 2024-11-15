const express = require("express");
const router = express.Router();
const FontService = require("../services/FontService");
const ImageService = require("../services/ImageService");
const { validateTextRequest } = require("../utils/validators");

router.get("/generate-text", async (req, res, next) => {
  let fontFamily;
  let fontPath;

  try {
    // Validate and parse request parameters
    const params = validateTextRequest(req.query);

    // Download and register font
    const [_fontFamily, _fontPath] = await FontService.downloadAndRegisterFont(
      params.fontUrl
    );

    fontFamily = _fontFamily;
    fontPath = _fontPath;

    // Generate image
    const canvas = ImageService.createTextImage({
      ...params,
      fontFamily,
    });

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
