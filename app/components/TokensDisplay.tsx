import { TokenParams } from "../types/Token"

interface TokensDisplayProps {
  tokenIn?: TokenParams | null;
  tokenOut?: TokenParams | null;
  allTokens: TokenParams[];
}

const TokensDisplay: React.FC<TokensDisplayProps> = ({
  tokenIn,
  tokenOut,
  allTokens,
}) => {
  return (
    <div>
      {tokenIn &&
        <p>Token From: {tokenIn.name}</p>
      }
      {tokenOut &&
        <p>Token To: {tokenOut.name}</p>
      }
      <p>All tokens:</p>
      {allTokens.map((token: any) => (
        <p>{token.name}</p>
      ))}
    </div>
  )
}

export default TokensDisplay