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
import TokenInput from "./TokenInput";
import { useAccount } from "wagmi";

import { CgArrowsExchangeAltV } from 'react-icons/cg';

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
  

  return (
    <div className="pt-20 pb-10 px-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-2xl">
        <TokenInput
          isConnected={isConnected}
          userAddress={address}
          token={tokenIn}
          modal={selectTokenInModal}
          label="You sell"
          amount={amountIn}
          setAmount={setAmountIn}
          priceCoingecko={priceCoingeckoIn}
          handlePriceCoingeckoChange={setPriceCoingeckoIn}
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
        <TokenInput
          isConnected={isConnected}
          userAddress={address}
          token={tokenOut}
          modal={selectTokenOutModal}
          label="You buy"
          amount={amountOut}
          setAmount={setAmountOut}
          priceCoingecko={priceCoingeckoOut}
          handlePriceCoingeckoChange={setPriceCoingeckoOut}
        />

        {isConnected ? (
          <button className="flex justify-center w-full mt-4 py-2.5 bg-violet-700
          rounded-xl hover:opacity-80 transition">
            Swap
          </button>
        ) : (
          <button className="flex justify-center w-full mt-4 py-2.5 bg-[#141619]
          rounded-xl hover:opacity-80 transition"
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
