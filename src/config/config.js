const path = require("path");

module.exports = {
  port: process.env.PORT || 3000,
  canvas: {
    width: 800,
    height: 200,
    defaultFontSize: 60,
  },
  paths: {
    temp: path.join(__dirname, "../../temp"),
  },
};
