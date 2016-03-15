import yargs from "yargs";

export default () => {
  let argv;

  argv = yargs
    .help("help")
    .showHelpOnFail(false, 'Specify --help for available options')
    .strict()
    .alias("?", "help")
    .alias("h", "help")
    .epilog("Made with fun Ian Teda")
    .argv;

  console.log("argv._", argv._);
};
