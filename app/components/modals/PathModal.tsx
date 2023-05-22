'use client';

import { ethers } from 'ethers';

import Modal from "./Modal";
import { Token } from "@/app/types/Token";
import usePathModal from '@/app/hooks//usePathModal';
import { getTokenSymbol } from "@/app/actions/getTokenSymbol";

interface PathModalProps {
  tokenIn?: Token | null | undefined;
  tokenOut?: Token | null | undefined;
  path?: Array<{ name: string; percentage: string; tokens: { from: string; to: string; }; }>
}

const PathModal: React.FC<PathModalProps> = ({
  tokenIn,
  tokenOut,
  path,
}) => {
  const pathModal = usePathModal();

  const provider = ethers.getDefaultProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);

  const bodyContent = (
    <ul className="mt-4">
      {path?.map((step, index) => (
        <li key={index} className="py-2">
          <p className="text-lg font-bold">Name:</p> {step.name}<br />
          <p className="text-lg font-bold">Percentage:</p> {step.percentage}<br />
          <p className="text-lg font-bold">Tokens: </p>
          <div className='flex gap-1'>
            <a>
            {step.tokens.from === 'tokenIn'
              ? tokenIn?.symbol
              : step.tokens.from === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                ? 'ETH'
                : getTokenSymbol(step.tokens.from, provider)
            }
            </a>
            <a>
              to
            </a>
            <a>
            {step.tokens.to === 'tokenOut'
              ? tokenOut?.symbol
              : step.tokens.to === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                ? 'ETH'
                : getTokenSymbol(step.tokens.to, provider)
            }
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
  return(
    <Modal
      isOpen={pathModal.isOpen}
      onClose={pathModal.onClose}
      title="View your swap path"
      body={bodyContent}
    />
  )
}

export default PathModal;