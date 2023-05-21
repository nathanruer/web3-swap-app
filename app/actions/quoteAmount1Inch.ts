import axios from 'axios';
import { ethers } from 'ethers';

import { getTokenDecimals } from './getTokenDecimals';

export async function quoteAmount1Inch(
  tokenInAddress: string,
  tokenOutAddress: string,
  amountInReadable: number,
): Promise<number> {
  const apiUrl = 'https://api.1inch.io/v5.0/1/quote';

  try {
    console.log('fetching...');
    const provider = ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
    const tokenInDecimals = await getTokenDecimals(tokenInAddress, provider);
    const tokenOutDecimals = await getTokenDecimals(tokenOutAddress, provider)
    const amountIn = ethers.utils.parseUnits(String(amountInReadable), tokenInDecimals);

    const response = await axios.get(apiUrl, {
      params: {
        fromTokenAddress: tokenInAddress,
        toTokenAddress: tokenOutAddress,
        amount: amountIn.toString(),
      }
    });

    const amountOut = response.data.toTokenAmount;
    const formattedAmountOut = ethers.utils.formatUnits(amountOut, tokenOutDecimals);
    return parseFloat(formattedAmountOut);
  } catch (error) {
    console.error('Error fetching quote from 1inch API:', error);
    throw error;
  }
}