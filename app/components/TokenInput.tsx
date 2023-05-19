'use client';

import { useState, useEffect } from "react";
import { Token } from "../types/Token";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { fetchPriceCoingecko } from "../actions/fetchPriceCoingecko";

interface TokenInputProps {
  token?: Token | null;
  modal: any;
  label: string;
  amount: number | undefined;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priceCoingecko: string;
  handlePriceCoingeckoChange: (e: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  token,
  modal,
  label,
  amount,
  handleAmountChange,
  priceCoingecko,
  handlePriceCoingeckoChange
}) => {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token && amount) {
        const result = await fetchPriceCoingecko(token?.coingeckoId, amount);
        if (result !== null) {
          handlePriceCoingeckoChange(result);
        }
      }
    };
    fetchData();
  }, [token, amount]);

  return (
    <div>
      {/* SM SCREENS */}
      <div className="hidden sm:block">
        <div
          className={`p-3 justify-center text-black rounded-xl mb-1 bg-[#141619]
          ${isFocus ? "border border-white" : ""}`}
        >
          <p className="text-gray-400 font-semibold text-xs px-2 py-1">{label}</p>
          <div className="flex gap-2 px-1">
            <input
              type="number"
              placeholder="Enter value"
              value={amount ?? ""}
              onChange={handleAmountChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              className="w-full p-2 rounded-xl bg-transparent text-white text-2xl"
            />
            <button
              className="flex w-full sm:w-[250px] text-white bg-[#222429] py-2 px-4 
              hover:bg-[#2e3138] transition rounded-xl items-center justify-between"
              onClick={modal.onOpen}
            >
              {token ? token.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
            </button>
          </div>
          {token && (amount !== undefined && amount !== 0) &&
            <p className="text-gray-400 font-semibold text-xs px-2 py-1">~${priceCoingecko}</p>
          }
        </div>
      </div>

      {/* MD AND LG SCREENS */}
      <div className="block sm:hidden">
        <div className={`p-3 justify-center text-black rounded-xl mb-1 bg-[#141619]
        ${isFocus ? "border border-white" : ""}`}>
          <p className="text-gray-400 font-semibold text-xs px-2 py-1">{label}</p>
          <div className="grid gap-2 px-1 py-2">
            <button
              className="flex w-full sm:w-[250px] text-white bg-[#222429] py-2 px-4 
              hover:bg-[#2e3138] transition rounded-xl items-center justify-between"
              onClick={modal.onOpen}
            >
              {token ? token.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
            </button>
            <input
              type="number"
              placeholder="Enter value"
              value={amount ?? ""}
              onChange={handleAmountChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              className="w-full px-2 py-1 rounded-xl bg-transparent text-white text-2xl"
            />
          </div>
          {token && (amount !== undefined && amount !== 0) &&
            <p className="text-gray-400 font-semibold text-xs px-2 py-1">~${priceCoingecko}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
