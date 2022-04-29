// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const mintdata = require("../mintlist.json");

const address = "0xb9143f6b2d837f306b9c3abe43cd13a7066c247d"

const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MAINPOLY_URL);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractAt("HACK60NFT", address, new ethers.Wallet(process.env.PRIVATE_KEY, provider));

  let name = await NFT.name()
  console.log("name:", name)

  console.log("NFT address:", NFT.address);

  const metadatafolderCID = "metadata_CID/"

  for(let i=0;i<mintdata.length;i++){
    let res = await NFT.safeMint(mintdata[i]["walletAddress"],metadatafolderCID+mintdata[i]["nft_save_name"]+".json",
      {
        gasPrice: ethers.utils.parseUnits('40','gwei').toString(),
        gasLimit: 230400
      })
    console.log(res)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
