const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());
const compile = require('../compile')
const interface = JSON.parse(compile).contracts["inbox.sol"].Inbox.abi;
const bytecode = JSON.parse(compile).contracts["inbox.sol"].Inbox.evm.bytecode.object;

// class Car {
//     park(){
//         return 'stopped'
//     }
//     drive(){
//         return 'vroom'
//     }
// }

// let car;

// beforeEach(()=>{
//     car = new Car()
// })

// describe('Car class',()=>{
//     it('can park',()=>{
//         assert.equal(car.park(),'stopped')
//     })
//     it('can drive',()=>{
//         assert.equal(car.drive(),'vroom')
//     })
// })
const message = "Hi There"
let accounts;
let inbox;
beforeEach(async () => {
    // Get a list of all accounts.
    accounts = await web3.eth.getAccounts();
  
    // Use one of those accounts to deploy the contract.
    inbox = await new web3.eth.Contract(interface)
      .deploy({ data: "0x" + bytecode, arguments: [message] })
      .send({ from: accounts[0], gas: "1000000" });
  });

describe('inbox', ()=> {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });
    it('it has a default message', async () => {
        const message  = await inbox.methods.message().call();
        assert.equal(message, message)
    });
    it('it can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]})
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye')
    });
    //  https://goerli.infura.io/v3/96f830a5b8284b7589c20ccfcd5c1370
});
