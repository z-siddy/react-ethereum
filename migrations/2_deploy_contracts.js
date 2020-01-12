const Buythereum = artifacts.require("Buythereum");

module.exports = function (deployer) {
  deployer.deploy(Buythereum);
};