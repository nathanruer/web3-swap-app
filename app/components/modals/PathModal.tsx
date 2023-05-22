'use client';

import { ethers } from 'ethers';

import Modal from "./Modal";
import { Token } from "@/app/types/Token";
import usePathModal from '@/app/hooks//usePathModal';
import { getTokenSymbol } from "@/app/actions/getTokenSymbol";

import { RiArrowRightLine } from 'react-icons/ri';

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
    <ul className="mt-4 flex">
      {path?.map((step, index) => (
        <div className='flex items-center w-full'>
          <li key={index} className="py-2">
            <p className="text-lg font-bold">Protocol:</p> {step.name}<br />
            <p className="text-lg font-bold">Percentage:</p> {step.percentage}<br />
            <p className="text-lg font-bold">Swap: </p>
            <div className='flex gap-1'>
              <a>
              {step.tokens.from === 'tokenIn'
                ? tokenIn?.symbol
                : step.tokens.from === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                  ? 'ETH'
                  : getTokenSymbol(step.tokens.from, provider)
              }
              </a>
              <a>to</a>
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
          {index !== path.length - 1 && (
            <a className='flex items-center justify-center flex-auto'>
              <RiArrowRightLine />
            </a>
          )}
        </div>
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