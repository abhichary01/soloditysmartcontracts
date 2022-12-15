const path = require('path');
const fs = require('fs');
const solc  = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8')

var input = {
    language: 'Solidity',
    sources: {
        'inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
module.exports = solc.compile(JSON.stringify(input));
// exports ABI interface
// module.exports.abi = outputContracts.abi;
// // exports bytecode from smart contract
// module.exports.bytecode = outputContracts.evm.bytecode.object;