'use client';

import { Token } from "../types/Token";
import SelectTokensInModal from "./modals/SelectTokenInModal";
import SelectTokensOutModal from "./modals/SelectTokenOutModal";
import useSelectTokenInModal from "../hooks/useSelectTokenInModal";
import useSelectTokenOutModal from "../hooks/useSelectTokenOutModal";
import TokenInput from "./TokenInput";

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
  const selectTokenInModal = useSelectTokenInModal();
  const selectTokenOutModal = useSelectTokenOutModal();

  return (
    <div className="pt-20 pb-10 px-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto rounded-2xl">
        <TokenInput 
          token={tokenIn}
          modal={selectTokenInModal}
          label="You buy"
        />
        <TokenInput 
          token={tokenOut}
          modal={selectTokenOutModal}
          label="You sell"
        />

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
