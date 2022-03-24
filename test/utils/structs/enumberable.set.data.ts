import { ethers } from "hardhat";

const deploy = async () => {
  const EnumerableSetDemo = await ethers.getContractFactory(
    "EnumerableSetDemo"
  );
  const enumerableSetDemo = await EnumerableSetDemo.deploy();
  await enumerableSetDemo.deployed();

  return { enumerableSetDemo };
};

const randomAddresses = [
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
];

export { deploy, randomAddresses };
