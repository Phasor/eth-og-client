# Design Pattern Decisions

I have used, amongst others, the following patterns to improve the contract's security:

## Inheritance

I am using the OpenZeppelin library contracts ERC 721 Enumerable and Ownable.


## Access Control

I am using the onlyOwner modifier from the OpenZeplin Ownable.sol contract.

## Order of Operations

I am using Checks-Effects-Interactions pattern. Please see the contract mint() function where I check with require statements, then update the tokenURIMapping and then call _safeMint().

