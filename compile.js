const path = require("path"); //help building directory path over to inbox.sol
//using path ensures that the path is correct regardless of the OS
//fs is a module that allows us to read the contents of a file
//FS = file system module
const fs = require("fs");
const solc = require("solc");

//dirname is a global variable that references the current working directory
//contracts directory is in the same directory as compile.js
//inbox.sol is in the contracts directory
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

//solc.compile returns an object that contains the compiled contract
//module exports allows us to export the compiled contract
module.exports = solc.compile(source, 1).contracts[":Inbox"];
