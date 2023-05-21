'use client';

import { useState, useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import { useConnectModal } from '@rainbow-me/rainbowkit';

import { Token } from "../types/Token";
import SelectTokensInModal from "./modals/SelectTokenInModal";
import SelectTokensOutModal from "./modals/SelectTokenOutModal";
import useSelectTokenInModal from "../hooks/useSelectTokenInModal";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
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

  const [isAmountOutLoading, setisAmountOutLoading] = useState(false);
  const handleAmountInChange = async () => {
    if (tokenIn && tokenOut && amountIn) {
      setisAmountOutLoading(true);
      const quotedAmountOut = await quoteAmount1Inch(tokenIn.address, tokenOut.address, amountIn);
      setisAmountOutLoading(false)
      setAmountOut(quotedAmountOut);
    }
  }

  const handleSwap = async () => {
    console.log('swap!')
  }
  

  return (
    <div className="pt-20 pb-10 px-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-3xl 
      bg-neutral-700/10 shadow-xl shadow-[#141619] p-10">
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
        
      </div>
    </div>
  );
};

export default Swap;
