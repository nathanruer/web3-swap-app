'use client';

import { useState, useEffect } from "react";
import { Token } from "../types/Token";

import { useBalance } from "wagmi";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { fetchPriceCoingecko } from "../actions/fetchPriceCoingecko";

interface InputProps {
  isConnected: boolean;
  userAddress: `0x${string}` | undefined
  token?: Token | null;
  disabled?: boolean;
  modal: any;
  label: string;
  amount: number | undefined;
  handleAmountChange?: () => void;
  isAmountLoading?: boolean;
  setAmount: (value: number | undefined) => void;
  priceCoingecko: string;
  setPriceCoingecko: (e: string) => void;
}

const Input: React.FC<InputProps> = ({
  isConnected,
  userAddress,
  token,
  disabled,
  modal,
  label,
  amount,
  setAmount,
  handleAmountChange,
  isAmountLoading,
  priceCoingecko,
  setPriceCoingecko
}) => {
  const [isFocus, setIsFocus] = useState(false);

  //TODO: FIX ERROR WHEN TOKEN UNDEFINED
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } = useBalance({
    address: userAddress,
    token: `0x${token?.address.slice(2)}`,
    onError() {},
  });

  const [isPriceCoingeckoLoading, setIsPriceCoingeckoLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (token && amount) {
        setIsPriceCoingeckoLoading(true);
        const result = await fetchPriceCoingecko(token?.coingeckoId, amount);
        setIsPriceCoingeckoLoading(false);

        if (handleAmountChange) {
          handleAmountChange()
        }
        
        if (result !== null) {
          setPriceCoingecko(result);
        }
      }
    };
    fetchData();
  }, [token, amount]);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? undefined : value);
  };

  const handleMaxBalance = () => {
    if (tokenBalance) {
      const formattedBalance: string | undefined = tokenBalance?.formatted;
      const balanceNumber: number | undefined = formattedBalance ? parseFloat(formattedBalance) : undefined;
      setAmount(balanceNumber)
    }
  }

  return (
    <div>
      {/* MD+ SCREENS */}
      <div className="hidden sm:block">
        <div
          className={`p-3 justify-center rounded-xl mb-1
          ${isFocus ? "border border-white" : ""}
          ${disabled ? "bg-transparent" : "bg-[#141619]"}`}
        >
          <p className="text-gray-400 font-semibold text-xs px-2 py-1">{label}</p>
          <div className="flex gap-2 px-1">
            {isAmountLoading ? (
              <div className="animate-pulse w-full h-[32] bg-[#2e3138] rounded-xl px-2"></div>
            ) : (
              <input
                type="number"
                placeholder={disabled ? "" : "Enter value"}
                value={amount ?? ""}
                onChange={onChangeAmount}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className="w-full px-2 rounded-xl bg-transparent text-white text-2xl"
                disabled={disabled}
              />
            )}
            <button className={`flex w-full sm:w-[250px] text-white py-2 px-4 
            transition rounded-xl items-center justify-center"
            ${disabled ? "bg-[#141619] hover:bg-[#181b1f]" : "bg-[#222429] hover:bg-[#2e3138]"}`}
            onClick={modal.onOpen}>
              <div className="flex w-full items-center justify-between">
              {token ? token.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
              </div>
            </button>
          </div>
            {token && (
              <div className={`flex ${amount ? "justify-between" : "justify-end"}`}>
                {amount ? (
                  <div className="px-2 mt-2 text-xs">
                    {isPriceCoingeckoLoading || isAmountLoading ? (
                      <div className="animate-pulse w-[75px] h-[16px] bg-[#2e3138] rounded-xl"></div>
                    ) : (
                      amount && (
                        <p className="text-gray-400 font-semibold">~${priceCoingecko}</p>
                      )
                    )}
                  </div>
                ) : null}
                {isConnected ? (
                  <div className="px-2 mt-2 text-xs">
                    <div className="text-gray-400">
                      {isTokenBalanceLoading ? (
                        <div className="animate-pulse w-[100px] h-[16px] bg-[#222429] rounded"></div>
                      ) : 
                      <div className="flex gap-2">
                        <p>Balance : {tokenBalance?.formatted}</p>
                        <button className="text-violet-500 hover:opacity-80 transition"
                        onClick={handleMaxBalance}>
                          Max
                        </button>
                      </div>
                      }
                    </div>
                  </div>
                ) : null}
              </div>
            )}
        </div>
      </div>

      {/* SM SCREENS */}
      <div className="block sm:hidden">
        <div className={`p-3 justify-center rounded-xl mb-1
        ${isFocus ? "border border-white" : ""}
        ${disabled ? "bg-transparent" : "bg-[#141619]"}`}>
          <p className="text-gray-400 font-semibold text-xs px-2 py-1">{label}</p>
          <div className="grid gap-2 px-1 py-2">
            <button className={`flex w-full sm:w-[250px] text-white py-2 px-4 
            transition rounded-xl items-center justify-center"
            ${disabled ? "bg-[#141619] hover:bg-[#181b1f]" : "bg-[#222429] hover:bg-[#2e3138]"}`}
            onClick={modal.onOpen}>
              {token ? token.symbol : "Select Token"} <MdOutlineKeyboardArrowDown />
            </button>
            {isAmountLoading ? (
              <div className="animate-pulse w-full h-[32] bg-[#2e3138] rounded-xl px-2"></div>
            ) : (
              <input
                type="number"
                placeholder={disabled ? "" : "Enter value"}
                value={amount ?? ""}
                onChange={onChangeAmount}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className="w-full px-2 rounded-xl bg-transparent text-white text-2xl"
                disabled={disabled}
              />
            )}
          </div>
          {token && (
            <div className={`flex ${amount ? "justify-between" : "justify-end"}`}>
              {amount ? (
                <div className="px-2 mt-2 text-xs">
                  {isPriceCoingeckoLoading || isAmountLoading ? (
                    <div className="animate-pulse w-[75px] h-[16px] bg-[#222429] rounded"></div>
                  ) : (
                    amount && (
                      <p className="text-gray-400 font-semibold">~${priceCoingecko}</p>
                    )
                  )}
                </div>
              ) : null}
              {isConnected ? (
                <div className="px-2 mt-2 text-xs">
                  <div className="text-gray-400">
                    {isTokenBalanceLoading ? (
                      <div className="animate-pulse w-[75px] h-[16px] bg-[#222429] rounded"></div>
                    ) : 
                    <div className="flex gap-2">
                      <p>Balance : {tokenBalance?.formatted}</p>
                      <button className="text-violet-500 hover:opacity-80 transition"
                      onClick={handleMaxBalance}>
                        Max
                      </button>
                    </div>
                    }
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
