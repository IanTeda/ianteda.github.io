/**
 * CLI (YARGS) Configuration
 * @param {yargs} yargs - Module for handling CLI arguments
 * @exports {argv} argv - Argument object
 */
module.exports = require("yargs")
  .usage("Usage: Gulp <mode> [-p -prod -production]")
  .command("script", "Run script tasks", {alias: "scripts"})
  .boolean("production")
  .alias("production", ["p", "prod"])
  .describe("production", "Run Gulp tasks in production mode")
  .example("gulp scripts:clean", "Clean JavaScript build folder")
  .example("gulp scripts:build", "Build JavaScript file from source")
  .example("gulp scripts", "Clean build folder, then build JavaScript from source")
  .example("gulp scripts -p", "Clean build folder, then build JavaScript from source with production (optimisation) options")
  .example("gulp styles:clean", "Clean Styles build folder")
  .example("gulp styles:build", "Build main.css file from source")
  .example("gulp styles", "Clean build folder, then build main.css from source")
  .example("gulp styles -p", "Clean build folder, then build main.css from source with production (optimisation) options")
  .boolean("clean")
  .alias("clean", ["c"])
  .describe("clean", "Run Gulp tasks clean destination folder first")
  .help("help")
  .alias("help", "?")
  .argv;
