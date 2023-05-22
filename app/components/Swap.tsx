'use client';

import { useState, useCallback, useEffect } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { ethers } from 'ethers';
import { getTokenDecimals } from "../actions/getTokenDecimals";

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useWaitForTransaction } from "wagmi";

import { Token } from "../types/Token";
import SelectTokensInModal from "./modals/SelectTokenInModal";
import SelectTokensOutModal from "./modals/SelectTokenOutModal";
import PathModal from "./modals/PathModal";
import useSelectTokenInModal from "../hooks/useSelectTokenInModal";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
import usePathModal from "../hooks/usePathModal";
import Input from "./Input";
import { useAccount } from "wagmi";

import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { quoteAmount1Inch } from "../actions/quoteAmount1Inch";

interface SwapProps {
  tokenIn?: Token | null;
  tokenOut?: Token | null;
  allTokens: Token[];
}

const Swap: React.FC<SwapProps> = ({
  tokenIn,
  tokenOut,
  allTokens,
}) => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const selectTokenInModal = useSelectTokenInModal();
  const selectTokenOutModal = useSelectTokenOutModal();

  const [amountIn, setAmountIn] = useState<number | undefined>();
  const [priceCoingeckoIn, setPriceCoingeckoIn] = useState("");

  const [amountOut, setAmountOut] = useState<number | undefined>();
  const [priceCoingeckoOut, setPriceCoingeckoOut] = useState("")

  const router = useRouter();
  const params = useSearchParams();
  const handleSwitch = useCallback((tokenIn: Token | null | undefined, tokenOut: Token | null | undefined) => {
    const { from, to, ...currentQuery } = qs.parse(params.toString());
    let updatedQuery: any = {};
    if (tokenIn) {
      updatedQuery.to = tokenIn.address;
    }
    if (tokenOut) {
      updatedQuery.from = tokenOut.address;
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: { ...currentQuery, ...updatedQuery },
    }, { skipNull: true });
    router.push(url);
  }, [router, params]);  

  const [path, setPath] = useState<Array<{ name: string; percentage: string; tokens: { from: string; to: string; }; }>>([]);
  const pathModal = usePathModal()
  const [isAmountOutLoading, setisAmountOutLoading] = useState(false);
  const handleAmountInChange = async () => {
    if (tokenIn && tokenOut && amountIn) {
      setisAmountOutLoading(true);
      const quote = await quoteAmount1Inch(tokenIn.address, tokenOut.address, amountIn);
      setisAmountOutLoading(false);
      setAmountOut(quote.amountOut);
      setPath(quote.path);
    }
  };

  const [txDetails, setTxDetails] = useState({
    to: undefined,
    data: undefined,
    value: undefined,
  });
  
  const { data, sendTransaction } = useSendTransaction({
    mode: 'recklesslyUnprepared',
    request: {
      from: address,
      to: txDetails.to,
      data: txDetails.data,
      value: txDetails.value,
    },
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  useEffect(() => {
    if (txDetails.to && txDetails.data && txDetails.value && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);
  
  const handleSwap = async () => {
    if (tokenIn && tokenOut && amountIn) {
      const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenIn?.address}&walletAddress=${address}`);
    
      if (allowance.data.allowance === "0") {
        const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenIn?.address}`);
        setTxDetails(approve.data);
        return;
      }

      const tx = await axios.get(`https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenIn?.address}&toTokenAddress=${tokenOut?.address}&amount=${ethers.utils.parseUnits(amountIn.toString(), 'ether')}&fromAddress=${address}&slippage=5`)
      // setTxDetails(tx.data.tx);
    }
  };  


  return (
    <div className="p-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-3xl 
      bg-neutral-700/10 shadow-2xl shadow-[#141619] p-10">
        <Input
          isConnected={isConnected}
          userAddress={address}
          token={tokenIn}
          modal={selectTokenInModal}
          label="You sell"
          amount={amountIn}
          setAmount={setAmountIn}
          handleAmountChange={handleAmountInChange}
          priceCoingecko={priceCoingeckoIn}
          setPriceCoingecko={setPriceCoingeckoIn}
        />
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button className="bg-white p-1 rounded-full
          hover:scale-110 transition duration-300 ease-in-out">
            <CgArrowsExchangeAltV 
              className="text-[#141619] text-2xl" 
              onClick={() => handleSwitch(tokenIn, tokenOut)}
            />
          </button>
        </div>
        <Input
          isConnected={isConnected}
          userAddress={address}
          token={tokenOut}
          disabled={true}
          modal={selectTokenOutModal}
          label="You buy"
          amount={amountOut}
          isAmountLoading={isAmountOutLoading}
          setAmount={setAmountOut}
          priceCoingecko={priceCoingeckoOut}
          setPriceCoingecko={setPriceCoingeckoOut}
        />
        
        {path.length > 0 && (
          isAmountOutLoading ? (
            <a className="flex justify-center w-full mt-4 py-2.5 bg-[#141619]
            rounded-xl hover:opacity-80 transition">
              Quoting the best path...
            </a>
          ) : (
            <button className="flex justify-center w-full mt-4 py-2.5 bg-[#141619]
            rounded-xl hover:opacity-80 transition"
            onClick={pathModal.onOpen}>
              Display the swap pathing
            </button>
          )
        )}

        {isConnected ? (
          <button className="flex justify-center w-full mt-4 py-2.5 
          bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br
          rounded-xl hover:opacity-80 transition"
          onClick={handleSwap}>
            Swap
          </button>
        ) : (
          <button className="flex justify-center w-full mt-4 py-2.5 bg-white
          text-[#141619] font-bold rounded-xl hover:opacity-80 transition"
          onClick={openConnectModal}>
            Connect Wallet
          </button>
        )
        }

        <SelectTokensInModal 
          allTokens={allTokens} 
        />
        <SelectTokensOutModal 
          allTokens={allTokens} 
        />
        <PathModal 
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          path={path}
        />
        
      </div>
    </div>
  );
};

export default Swap;
