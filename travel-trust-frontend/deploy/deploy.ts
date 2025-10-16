import { DeployFunction } from 'hardhat-deploy/types';

// @ts-ignore
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedTravelTrust = await deploy('TravelTrust', {
    from: deployer,
    log: true,
  });

  console.log(`TravelTrust contract deployed at: `, deployedTravelTrust.address);
};

export default func;

func.id = 'deploy_travelTrust'; // id required to prevent reexecution
func.tags = ['TravelTrust'];
