const EthOG = artifacts.require("EthOG");

module.exports = function (deployer) {
    deployer.deploy(EthOG, "EthOG", "EthOG");
};
