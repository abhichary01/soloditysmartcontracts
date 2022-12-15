const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compile = require('./compile')
const interface = JSON.parse(compile).contracts["inbox.sol"].Inbox.abi;
const bytecode = JSON.parse(compile).contracts["inbox.sol"].Inbox.evm.bytecode.object;

const provider = new HDWalletProvider(
    'alert topic quick tree uncle craft broccoli card outdoor garment palm echo',
    'https://goerli.infura.io/v3/96f830a5b8284b7589c20ccfcd5c1370'
);
   
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0])

    const result = await new web3.eth.Contract(interface)
    .deploy({ data: "0x"+ bytecode, arguments: ['Hi there']})
    .send({gas: '1000000', from: accounts[0]})

    console.log('contract deployed to', result.options.address);
    provider.engine.stop()
};
deploy();