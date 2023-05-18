'use client';

import { useState, useEffect } from "react";
import { Token } from "../types/Token";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { fetchPriceCoingecko } from "../utils/fetchPriceCoingecko";

interface SwapProps {
  token?: Token | null;
  modal: any;
  label: string;
}

const TokenInput: React.FC<SwapProps> = ({
  token,
  modal,
  label,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [priceCoingecko, setPriceCoingecko] = useState<number | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (token && amount) {
        const result = await fetchPriceCoingecko(token?.coingeckoId, amount);
        if (result !== null) {
          setPriceCoingecko(result);
        }
      }
    };
    fetchData();
  }, [token, amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? undefined : value);
  };

  return (
    <div>
      <div
        className={`p-3 justify-center text-black rounded-xl mb-1 bg-[#141619] ${
          isFocus ? "border border-white" : ""
        }`}
      >
        <p className="text-gray-400 font-semibold text-xs px-2 py-1">{label}</p>
        <div className="grid sm:flex gap-2">
          <input
            type="number"
            placeholder="Enter value"
            value={amount ?? ""}
            onChange={handleAmountChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className="w-full p-2 rounded-xl bg-transparent text-white"
          />
          <button
            className="flex w-full sm:w-[250px] text-white bg-[#222429] py-2 px-4 hover:opacity-80 transition rounded-xl items-center justify-between"
            onClick={modal.onOpen}
          >
            {token ? token.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        {token && (amount !== undefined && amount !== 0) &&
          <p className="text-gray-400 font-semibold text-xs px-2 py-1">
            ${priceCoingecko}
          </p>
        }
      </div>
    </div>
  );
};

export default TokenInput;
