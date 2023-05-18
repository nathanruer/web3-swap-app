'use client';

import { Token } from "../types/Token"
import SelectTokensInModal from './modals/SelectTokensInModal';
import SelectTokensOutModal from "./modals/SelectTokensOutModal";
import useSelectTokensInModal from "../hooks/useSelectTokensInModal";
import useSelectTokensOutModal from "../hooks/useSelectTokensOutModal";

import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface TokensDisplayProps {
  tokenIn?: Token | null;
  tokenOut?: Token | null;
  allTokens: Token[];
}

const TokensDisplay: React.FC<TokensDisplayProps> = ({
  tokenIn,
  tokenOut,
  allTokens,
}) => {
  const selectTokensInModal = useSelectTokensInModal();
  const selectTokensOutModal = useSelectTokensOutModal()

  return (
    <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 border">
      <div className="flex flex-col">
        <div className="flex justify-between p-1">
          <p>Amount</p>
          <button
            className="flex bg-white text-gray-900 p-1 hover:bg-white/80 
            transition rounded-xl items-center justify-between"
            onClick={selectTokensInModal.onOpen}
          >
            {tokenIn ? tokenIn.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
          </button>

        </div>
        <div className="flex justify-between p-1">
          <p>Amount</p>
          <button
            className="flex bg-white text-gray-900 p-1 hover:bg-white/80 
            transition rounded-xl items-center justify-between"
            onClick={selectTokensOutModal.onOpen}
          >
            {tokenOut ? tokenOut.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
          </button>
        </div>
      </div>

      <SelectTokensInModal 
        allTokens={allTokens}
      />
      <SelectTokensOutModal
        allTokens={allTokens}
      />
    </div>
  )
}

export default TokensDisplay