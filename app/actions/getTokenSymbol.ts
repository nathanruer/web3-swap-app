import { ethers } from 'ethers';

export async function getTokenSymbol(tokenAddress: string, provider: ethers.providers.Provider): Promise<string> {
  const abi = ['function symbol() view returns (string)'];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const symbol = await tokenContract.symbol();
  return symbol;
}
