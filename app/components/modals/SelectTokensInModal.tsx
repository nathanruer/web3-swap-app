'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


import Modal from "./Modal";
import useSelectTokensInModal from '@/app/hooks/useSelectTokensInModal';

import { Token } from "@/app/types/Token";

interface SeelectTokensInModalProps {
  allTokens: Token[];
}

const SelectTokensInModal: React.FC<SeelectTokensInModalProps> = ({
  allTokens
}) => {
  const selectTokensModal = useSelectTokensInModal();

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
            onClick={() => handleClick('from', token)}
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

export default SelectTokensInModal;
