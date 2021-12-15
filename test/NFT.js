const EthOG = artifacts.require("EthOG");
const { catchRevert } = require('./catcher');

/* 
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
These are some basic unit tests on EthOG.sol. 
*/

contract("EthOG", function (accounts) {
  it("should assert true", async function () {
    await EthOG.deployed();
    return assert.isTrue(true);
  });

  //1. allows user to mint a token
  it("should allow a token to be minted", async () => {
    const EthOGInstance = await EthOG.deployed();

    //record initial token supply 
    const initialSupply = await EthOGInstance.totalSupply.call();

    //mint the nft 
    await EthOGInstance.mint(
      accounts[0],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[0] }
    );

    //check total supply is 1 more than it was before
    const postIssuanceSupply = await EthOGInstance.totalSupply.call();
    assert.equal(postIssuanceSupply.toNumber(), initialSupply.toNumber() + 1, "did not mint");
  }

  );

  //2. owner can change the token uri
  it("should let the owner change the tokenURI", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //get the current token supply
    const tokenSupply = await EthOGInstance.totalSupply.call();

    //get current tokenURI for the last token issued
    const initialURI = await EthOGInstance.tokenURI.call(tokenSupply);

    //change the token URI
    const _newURI = "newURI676876784";
    await EthOGInstance.changeTokenURI(tokenSupply, _newURI, { from: accounts[0] });
    const updatedURI = await EthOGInstance.tokenURI.call(tokenSupply);

    expect(updatedURI).not.equal(initialURI);
  });

  //3. nobody else can change the token uri
  it("should NOT let non-owners change the tokenURI", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //get the current token supply
    const tokenSupply = await EthOGInstance.totalSupply.call();

    //change the token URI by an account that is NOT the owner i.e. account 1
    const _newURI = "newURI";
    await catchRevert(EthOGInstance.changeTokenURI(tokenSupply, _newURI, { from: accounts[1] }));
  });

  //4.owner can change the cost
  it("should let the owner change the cost", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    const initialCost = await EthOGInstance.cost.call();

    //change the cost
    const newCost = 600000000;
    await EthOGInstance.setCost(newCost, { from: accounts[0] });
    const updatedCost = await EthOGInstance.cost.call();

    assert.equal(updatedCost, newCost, "new cost not set");
  });

  //5.owner can withdraw funds
  it("should let the owner withdraw funds", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //get balance of account 0 before sending transation
    const initialOwnerBalance = await web3.eth.getBalance(accounts[0]);

    //mint the nft, sends 0.05 eth to the contract
    await EthOGInstance.mint(
      accounts[1],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[1], value: 50000000000000000 });

    //withdraw contract funds
    await EthOGInstance.withdraw({ from: accounts[0] });
    const contractBalancePostWithdraw = await EthOGInstance.getContractEthBalance();

    //get balance of account 0 after sending transation
    const endingOwnerBalance = await web3.eth.getBalance(accounts[0]);

    assert.equal(contractBalancePostWithdraw, 0, "not all contract funds withdrawn");
    assert.operator(endingOwnerBalance, '>', initialOwnerBalance, 'ending balance less than beginning balance');
  });

  //6. non-owner can NOT withdraw funds
  it("should NOT let a non owner withdraw funds", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //mint the nft, sends 0.05 eth to the contract
    await EthOGInstance.mint(
      accounts[1],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[1], value: 50000000000000000 });

    //withdraw contract funds
    await catchRevert(EthOGInstance.withdraw({ from: accounts[1] }));
  });

  //7. white listed user should mint for free
  it("should be a free mint for whitelisted users", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //record initial token supply 
    const initialSupply = await EthOGInstance.totalSupply.call();

    //owner whitelists a non-owner user
    EthOGInstance.whitelistUser(accounts[1], { from: accounts[0] });

    //mint the nft, sending 0 eth
    await EthOGInstance.mint(
      accounts[1],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[1], value: 0 });

    //record end token supply 
    const endSupply = await EthOGInstance.totalSupply.call();
    assert.equal(endSupply.toNumber(), initialSupply.toNumber() + 1, "did not mint");
  });

  //8. should be able to pause the contract
  it("should be able to pause the contract", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //owner pauses the contract
    await EthOGInstance.pause(true, { from: accounts[0] });

    //mint the nft
    await catchRevert(EthOGInstance.mint(
      accounts[0],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[0], value: 0 }));
  });

  //9. non-owner should NOT be able to change the cost
  it("non-owner should NOT be able to change the cost", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //unpause the contract
    await EthOGInstance.pause(false, { from: accounts[0] });

    //non-owner tries to change the cost
    await catchRevert(EthOGInstance.setCost('20000000000000000', { from: accounts[1] }));
  });

  //10. Owner should be able to change the cost
  it("owner should be able to change the cost", async () => {
    //get the contract instance
    const EthOGInstance = await EthOG.deployed();

    //record initial token supply 
    const initialSupply = await EthOGInstance.totalSupply.call();

    //non-owner changes the cost
    await EthOGInstance.setCost('20000000000000000', { from: accounts[0] });

    //mint the nft
    await EthOGInstance.mint(
      accounts[1],
      1,
      '2021ipfs://bafyreiar3gyursrpcazs5xsanervr3romibpxfsgcbrxm3ii4paaqai7vq/metadata.json',
      '0x3ae5e5008363d47d7f2aa98250156c24b8e96f59f72702a6fe6555dd2e497e1c2c0b4862a023e7716871aff8a15aae13d92ea30f5f646e49f3331c1a41bf75791c',
      { from: accounts[1], value: '20000000000000000' });

    //record initial token supply 
    const endingSupply = await EthOGInstance.totalSupply.call();

    assert.equal(endingSupply.toNumber(), initialSupply.toNumber() + 1, "did not mint");

  });





});
