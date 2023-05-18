'use client';

import { useState } from "react";
import { Token } from "../types/Token";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface SwapProps {
  token?: Token | null;
  modal: any;
}

const TokenInput: React.FC<SwapProps> = ({
  token,
  modal,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div>
      <div className={`p-3 justify-center text-black rounded-xl 
        mb-1 bg-[#141619]
        ${isFocus ? "border border-white" : "" }`}>
          <div className="grid sm:flex gap-2">
            <input
              type="number"
              placeholder="Enter value"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />
            <button
              className="flex w-full sm:w-[250px] text-white bg-[#222429] py-2 px-4
              hover:opacity-80 transition rounded-xl items-center justify-between"
              onClick={modal.onOpen}
            >
              {token ? token.symbol : "Select Token"}{" "}
              <MdOutlineKeyboardArrowDown />
            </button>
          </div>
        </div>
    </div>
  )
}

export default TokenInput