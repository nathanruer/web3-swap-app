import axios from 'axios';
import { ethers } from 'ethers';

import { getTokenDecimals } from './getTokenDecimals';

export async function quoteAmount1Inch(
  tokenInAddress: string,
  tokenOutAddress: string,
  amountInReadable: number,
): Promise<{ amountOut: number, path: { name: string, percentage: string, tokens: { from: string, to: string } }[] }> {
  const apiUrl = 'https://api.1inch.io/v5.0/1/quote';

  try {
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

    const path = response.data.protocols.flatMap((protocols: any) =>
      protocols.flatMap((steps: any) =>
        steps.map((step: any) => {
          const percentage = step.part + '%';
          const fromToken = step.fromTokenAddress === tokenInAddress ? 'tokenIn' : step.fromTokenAddress;
          const toToken = step.toTokenAddress === tokenOutAddress ? 'tokenOut' : step.toTokenAddress;
          return { name: step.name, percentage, tokens: { from: fromToken, to: toToken } };
        })
      )
    );

    return { amountOut: parseFloat(formattedAmountOut), path };
  } catch (error) {
    console.error('Error fetching quote from 1inch API:', error);
    throw error;
  }
}
