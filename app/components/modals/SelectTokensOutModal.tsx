'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import Modal from "./Modal";
import useSelectTokensOutModal from '@/app/hooks/useSelectTokensOutModal';

import { Token } from "@/app/types/Token";

interface SeelectTokensOutModalProps {
  allTokens: Token[];
}

const SelectTokensOutModal: React.FC<SeelectTokensOutModalProps> = ({
  allTokens
}) => {
  const selectTokensModal = useSelectTokensOutModal();

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

  const bodyContent = (
    <div>
      {allTokens.map((token: any) => (
        <div>
          <button
            onClick={() => handleClick('to', token)}
          >
            {token.name} ({token.symbol})
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={selectTokensModal.isOpen}
      onClose={selectTokensModal.onClose}
      title="Select token"
      body={bodyContent}
    />
  );
};

export default SelectTokensOutModal;
