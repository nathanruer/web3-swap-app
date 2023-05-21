import { ethers } from 'ethers';

export async function getTokenDecimals(tokenAddress: string, provider: ethers.providers.Provider): Promise<number> {
  const abi = ['function decimals() view returns (uint8)'];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const decimals = await tokenContract.decimals();
  return decimals;
}
