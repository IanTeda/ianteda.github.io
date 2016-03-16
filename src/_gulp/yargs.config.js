/**
 * CLI (YARGS) Configuration
 * @param {yargs} yargs - Module for handling CLI arguments
 * @exports {argv} argv - Argument object
 */
module.exports = require("yargs")
  .usage("Usage: Gulp <mode> [-p -production]")
  .command("script", "Run script tasks", {alias: "scripts"})
  .boolean("production")
  .alias("production", ["p"])
  .describe("production", "Run Gulp tasks in production mode")
  .example("gulp script:clean", "Clean JavaScript build folder")
  .example("gulp script:build", "Build JavaScript file from source")
  .example("gulp script", "Clean build folder, then build JavaScript from source")
  .example("gulp script -p", "Clean build folder, then build JavaScript from source with production (optimisation) options")
  .boolean("clean")
  .alias("clean", ["c"])
  .describe("clean", "Run Gulp tasks clean destination folder first")
  .help("help")
  .alias("help", "?")
  .argv;
