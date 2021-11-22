const NFT = artifacts.require("NFT");
const { catchRevert } = require('./catcher');

/* 
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
These are some basic unit tests on NFT.sol. 
*/

contract("NFT", function (accounts) {
  it("should assert true", async function () {
    await NFT.deployed();
    return assert.isTrue(true);
  });

  //1. allows user to mint a token
  it("should allow a token to be minted", async () => {
    const nftInstance = await NFT.deployed();

    //record initial token supply 
    const initialSupply = await nftInstance.totalSupply.call();

    //mint the nft 
    await nftInstance.mint(
      accounts[0],
      1,
      'ipfs://fakeURL',
      { from: accounts[0] }
    );

    //check total supply is 1 more than it was before
    const postIssuanceSupply = await nftInstance.totalSupply.call();
    assert.equal(postIssuanceSupply.toNumber(), initialSupply.toNumber() + 1, "did not mint");
  }

  );

  //2. owner can change the token uri
  it("should let the owner change the tokenURI", async () => {
    //get the contract instance
    const nftInstance = await NFT.deployed();

    //get the current token supply
    const tokenSupply = await nftInstance.totalSupply.call();

    //get current tokenURI for the last token issued
    const initialURI = await nftInstance.tokenURI.call(tokenSupply);

    //change the token URI
    const _newURI = "newURI676876784";
    await nftInstance.changeTokenURI(tokenSupply, _newURI, { from: accounts[0] });
    const updatedURI = await nftInstance.tokenURI.call(tokenSupply);

    expect(updatedURI).not.equal(initialURI);
  });

  //3. nobody else can change the token uri
  it("should NOT let non-owners change the tokenURI", async () => {
    //get the contract instance
    const nftInstance = await NFT.deployed();

    //get the current token supply
    const tokenSupply = await nftInstance.totalSupply.call();

    //change the token URI by an account that is NOT the owner i.e. account 1
    const _newURI = "newURI";
    await catchRevert(nftInstance.changeTokenURI(tokenSupply, _newURI, { from: accounts[1] }));
  });

  //4.owner can change the cost
  it("should let the owner change the cost", async () => {
    //get the contract instance
    const nftInstance = await NFT.deployed();

    const initialCost = await nftInstance.cost.call();

    //change the cost
    const newCost = 600000000;
    await nftInstance.setCost(newCost, { from: accounts[0] });
    const updatedCost = await nftInstance.cost.call();

    assert.equal(updatedCost, newCost, "new cost not set");
  });

  //5.owner can withdraw funds
  it("should let the owner withdraw funds", async () => {
    //get the contract instance
    const nftInstance = await NFT.deployed();

    //withdraw contract funds
    await nftInstance.withdraw.call({ from: accounts[0] });
    const contractBalancePostWithdraw = await nftInstance.getContractEthBalance.call();

    assert.equal(contractBalancePostWithdraw, 0, "not all contract funds withdrawn");
  });
});
