const Migrations = artifacts.require("Migrations");
const WePiggyToken = artifacts.require("WePiggyToken");
const PiggyBreeder = artifacts.require('PiggyBreeder');
const FundingManager = artifacts.require('FundingManager');
const FundingHolder = artifacts.require('FundingHolder');
const MockErc20 = artifacts.require('MockErc20');

module.exports = async function(callback) {
	try {
		console.log("IT WORKS");
	  	piggyToken = await WePiggyToken.deployed();
	    fundingManager = await FundingManager.deployed();
	    fundingHolder = await FundingHolder.deployed();
	    piggyBreeder = await PiggyBreeder.deployed();
	    lp = await MockErc20.deployed();

	    const accounts = await web3.eth.getAccounts()
	    const [alice, bob, carol, dev, minter, FH1, FH2, FH3, FH4, FH5] = accounts;

        await lp.transfer(alice, '1000', {from: minter});
        await lp.transfer(bob, '1000', {from: minter});
        await lp.transfer(carol, '1000', {from: minter});	    

	  	await fundingManager.addFunding('InsurancePayment', fundingHolder.address ,100)
	  	await piggyToken.grantRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', piggyBreeder.address);
	  	await piggyBreeder.add('1000', lp.address, '0x0000000000000000000000000000000000000000',true);

	  	await lp.approve(this.piggyBreeder.address, '1000', {from: bob});
	  	await piggyBreeder.stake(0, '100', {from: bob});

	  	//console.log("balanceof fundingManager: ", (await piggyToken.balanceOf(alice)).toNumber())
	  	await fundingManager.getPendingBalance(0)
	  	await fundingManager.claim()
		let b1 = await piggyToken.balanceOf(fundingManager.address)
		let b2 = await piggyToken.balanceOf(fundingHolder.address)
		console.log("b1 fundingManager: ", b1)
		console.log("b2 fundingHolder: ", b2)


	    console.log("piggyToken: ", piggyToken.address)
	    console.log("fundingManager: ", fundingManager.address)
	    console.log("fundingHolder: ", fundingHolder.address)
	    console.log("piggyBreeder: ", piggyBreeder.address)
	    console.log("mockErc20 as lp: ", lp.address)


	}catch(error) {
    	console.log(error)
  	}
	callback();
}