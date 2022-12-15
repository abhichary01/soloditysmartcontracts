// SPDX-License-Identifier: MIT

pragma solidity >=0.8.6 <0.9.0;

contract Inbox {
    string public message;
    
    function Ibox(string memory initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}