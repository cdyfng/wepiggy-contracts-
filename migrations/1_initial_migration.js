const Migrations = artifacts.require("Migrations");
const WePiggyToken = artifacts.require("WePiggyToken");
const PiggyBreeder = artifacts.require('PiggyBreeder');
const FundingManager = artifacts.require('FundingManager');
const FundingHolder = artifacts.require('FundingHolder');
const MockErc20 = artifacts.require('MockErc20');

// const BN = web3.utils.BN;
// const UNIT = new BN('1000000000000000000');
module.exports = async function(deployer, network, accounts) {
  const [alice, bob, carol, dev, minter, FH1, FH2, FH3, FH4, FH5] = accounts;
  await deployer.deploy(Migrations);
  piggyToken = await deployer.deploy(WePiggyToken);
  fundingManager = await deployer.deploy(FundingManager, piggyToken.address);
  fundingHolder = await deployer.deploy(FundingHolder, piggyToken.address);
  //await fundingManager.addFunding('give me money', '0x0000000000000000000000000000000000000000',30, {from: deployer})
  piggyBreeder = await deployer.deploy(PiggyBreeder, piggyToken.address, fundingManager.address, '1000000000000000000', '0', '1000', '5760', '999', '39');
  mockErc20 = await deployer.deploy(MockErc20, 'LPToken', 'LP', '10000000000', {from: minter});

  console.log("piggyToken: ", piggyToken.address)
  console.log("fundingManager: ", fundingManager.address)
  console.log("fundingHolder: ", fundingHolder.address)
  console.log("piggyBreeder: ", piggyBreeder.address)
  console.log("mockErc20: ", mockErc20.address)

  console.log('alice: ', alice)

  //truffle console
  //let accounts = await web3.eth.getAccounts()
  // (await piggyToken.balanceOf(accounts[0])).toNumber()

  // let fundingManager = await FundingManager.deployed()
  //balance = await fundingManager.getPendingBalance(0)
  //console.log("getPendingBalance: ", balance)

};
