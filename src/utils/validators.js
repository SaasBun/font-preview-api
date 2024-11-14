const { ValidationError } = require("./errors");

const validateTextRequest = (query) => {
  const { fontUrl, text, isItalic, fontSize } = query;

  if (!fontUrl) throw new ValidationError("Font URL is required");
  if (!text) throw new ValidationError("Text is required");

  return {
    fontUrl,
    text,
    isItalic: isItalic ? isItalic.toLowerCase() === "true" : false,
    fontSize: fontSize ? parseInt(fontSize, 10) : 60,
  };
};

module.exports = {
  validateTextRequest,
};
