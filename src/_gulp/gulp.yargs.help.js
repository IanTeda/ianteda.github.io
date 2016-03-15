import yargs from 'yargs';

export default () => {
    let argv;

    argv = yargs
        .help('help')
        .strict()
        .alias( "?", "help" )
        .epilog( "Made with fun Ian Teda" )
        .argv;

    console.log('argv._', argv._);
};

var options = require( "yargs" )  
    .usage( "Usage: $0 <url> [-u \"username\"] [-p \"password\"] [--post] [--data \"{key:value}\"]" )
    .command( "url", "URL to request", { alias: "url" } )
    .required( 1, "URL is required" )
    .option( "u", { alias: "user", demand: false, describe: "Username", type: "string" } )
    .option( "p", { alias: "password", demand: false, describe: "Password", type: "string" } )
    .option( "d", { alias: "data", describe: "Data to send as JSON", type: "string" } )
    .option( "get", { describe: "Use HTTP GET", type: "boolean" } )
    .option( "post", { describe: "Use HTTP POST", type: "boolean" } )
    .option( "put", { describe: "Use HTTP PUT", type: "boolean" } )
    .option( "del", { describe: "Use HTTP DELETE", type: "boolean" } )
    .help( "?" )
    .alias( "?", "help" )
    .example( "$0 https://example.com/api/posts", "Get a list of posts" )
    .example( "$0 https://example.com/api/posts --post --data \"{ 'title': 'Avast ye!', 'body': 'Thar be a post hyar!'}\"", "Create a new post" )
    .epilog( "Copyright 2015 ReverentGeek" )
    .argv;

// Get the URL from the first parameter
var url = options._[ 0 ];

// Make "get" the default if no verb is specified
if ( !options.get && !options.post && !options.put && !options.del ) {  
    options.get = true;
}

console.log( "url:", url );  
console.log( "options:", options );  