// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title An ERC 721 NFT minting contract
/// @author Phas0r
/// @notice You can use this contract to mint an NFT that shows when you first interacted with Eth mainnet using a metamask wallet
/// @custom:experimental This is an experimental contract.
contract NFT is ERC721Enumerable, Ownable {
  
  using Strings for uint256;
  uint256 public cost = 0.05 ether;
  uint256 public maxMintAmount = 1;
  bool public paused = false;
  mapping(address => bool) public whitelisted;
  mapping(uint256 => string) public tokenURIMapping; //tokenID to tokenURI 
  address public apiAddress = 0x14791697260E4c9A71f18484C9f997B308e59325; //back-end api public key, used for authorisation

  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
    //mint(msg.sender, 1); 
  }

  /// @notice main function that mints the NFT
  /// @dev removed the ability to mint more than 1 NFT per transaction
  /// @param _metaDataURI The URL where the metadata for the NFT is hosted
  /// @param _mintAmount must be 1
  /// @param sig = the cryptographic signature from our api
  function mint(
    address _to, 
    uint256 _mintAmount, 
    string memory _metaDataURI, 
    bytes memory sig) 
    public payable {
    uint256 supply = totalSupply(); //current number minted to date
    require(!paused);
    require(checkSigner(_metaDataURI,sig) == true); //check metadata url is authentic and from our api
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost * _mintAmount);
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      tokenURIMapping[supply + i] = _metaDataURI; 
      _safeMint(_to, supply + i); 
    }
  }

  /// @notice returns the tokens owned by an address
  /// @return tokenIds owned by _owner from this contract
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  /// @notice returns the URL where the NFT metadata is hosted
  /// @dev used by Opensea to pull in metadata
  /// @param tokenId the token id you want the metadata url for
  /// @return tokenURIMapping returns the string URL where the metadata of the token argument is hosted
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    return tokenURIMapping[tokenId];
  }

  /// @notice sets new NFT price for non owner and non whitelisted addresses
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  /// @notice sets the max mint amount per transaction
  /// @dev currently set to 1 to restrict minting 
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  /// @dev changes the metadata URL associated with the argument _tokenID. Allows metadata to be migrated/moved/updated
  function changeTokenURI(uint256 _tokenID, string memory _newURI) public onlyOwner {
    tokenURIMapping[_tokenID] = _newURI;
  }

  /// @dev stops the contract minting when true
  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  /// @notice adds an address to the whitelist. Whitelisted addresses can mint for free.
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
   /// @notice removes an address to the whitelist. Whitelisted addresses can mint for free.
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  /// @notice removes all funds from the contract to the owners address
  function withdraw() public onlyOwner {
    // get the amount of Ether stored in this contract
    uint amount = address(this).balance;

    // send all Ether to owner
    (bool success, ) = payable(owner()).call{value: amount}("");
    require(success, "Failed to send Ether");
    }
  
  function getContractEthBalance() public view returns(uint256) {
    return address(this).balance;
  }

  /// @notice helper function used to verify the metadata URL used in the mint function comes from the authentic dApp
  /// @dev uses ethers.js public/private key signatures 
  function splitSignature(bytes memory sig) pure public returns (uint8 v, bytes32 r, bytes32 s)
  {
      require(sig.length == 65);

      assembly {
          // first 32 bytes, after the length prefix.
          r := mload(add(sig, 32))
          // second 32 bytes.
          s := mload(add(sig, 64))
          // final byte (first byte of the next 32 bytes).
          v := byte(0, mload(add(sig, 96)))
      }

      return (v, r, s);
  }

  /// @notice function to check the metadata url came from the right backend API and is therefore authentic
  /// @param unhashedMessage the unhashed IPFS metadata url for the new token
  /// @param sig the cryptographic signature when the private key is used to sign the unhashedMessage
  function checkSigner(string memory unhashedMessage, bytes memory sig) view public returns (bool)
  {
      ///hash the input message
      bytes32 message = keccak256(abi.encodePacked(unhashedMessage));
      
      ///split signature
      (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
      
      ///recover the signing address
      address signer =  ecrecover(message, v, r, s);

      ///check if the url was produced by the API
      return signer == apiAddress;
  }

}