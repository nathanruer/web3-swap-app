'use client';

import { useState, useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSelectTokensOutModal from '@/app/hooks/useSelectTokenOutModal';
import { Token } from "@/app/types/Token";

interface SelectTokenOutModalProps {
  allTokens: Token[];
}

const SelectTokenOutModal: React.FC<SelectTokenOutModalProps> = ({
  allTokens,
}) => {
  const selectTokensModal = useSelectTokensOutModal();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback((query: string, token: Token) => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      [query]: token.address
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });
    router.push(url);
    selectTokensModal.onClose();
  }, [router, params]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredTokens = allTokens.filter((token) => {
    const { name, symbol, address } = token;
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const lowerCaseAddress = address.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseSearchValue) ||
      symbol.toLowerCase().includes(lowerCaseSearchValue) ||
      lowerCaseAddress === lowerCaseSearchValue
    );
  });

  const headContent = (
    <div className={`bg-[#141619] rounded-xl border hover:border-white transition
    ${isInputFocused ? 'border-white ' : 'border-[#31343d]'}`}>
      <input
        type="text"
        placeholder="Search... (Symbol or Address)"
        className="p-1.5 w-full"
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
    </div>
  )

  const bodyContent = (
    <div>
      {filteredTokens.map((token: any) => (
        <div key={token.id}>
          <button
            onClick={() => handleClick("to", token)}
            className='py-1.5 text-md'
          >
            {token.name} ({token.symbol})
          </button>
          <hr className='border-[#31343d]' />
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={selectTokensModal.isOpen}
      onClose={selectTokensModal.onClose}
      title="Select token"
      head={headContent}
      body={bodyContent}
    />
  );
};

export default SelectTokenOutModal;
