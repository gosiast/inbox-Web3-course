const assert = require("assert");
const ganache = require("ganache");

//when we use Web3 'w' needs to be a capital letter
//constructing an instance of Web3
const { Web3 } = require("web3");
const { interface, bytecode } = require("../compile");

//lowercase means instance of web3 and tells that instead to connect to local network we are going to connect to ganache
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
//usually we would use a beforeEach function to set up the environment for the tests
beforeEach(async () => {
	// Get a list of all accounts
	//lower case web3- instance that we already created
	//we access ethereum module, there are a bunch of modules that are available to us on the module we access getAccounts function
	accounts = await web3.eth.getAccounts();
	console.log(accounts);

	//use one of those accounts to deploy contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ["Hi there!"] })
		.send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
	it("deploys a contract", () => {
		assert.ok(inbox.options.address);
	});
	it("has a default message", async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, "Hi there!");
	});
	//So accounts= account addresses. We're going to take the first address out of there and have that person pay for sending this change into the network.
	it("can change the message", async () => {
		await inbox.methods.setMessage("bye").send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, "bye");
	});
});

wefdefwewf;
