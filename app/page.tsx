import getTokenByAddress from "./actions/getTokenByAddress";
import getAllTokens from "./actions/getAllTokens";
import { IPathParams } from "./types/IPathParams";
import TokensDisplay from "./components/TokensDisplay";

interface HomeProps {
  searchParams: IPathParams
};

const Home = async ({ searchParams }: HomeProps) => {
  let tokenFrom = null;
  if (searchParams.from) {
    tokenFrom = await getTokenByAddress(searchParams.from);
  }
  let tokenTo = null;
  if (searchParams.to) {
    tokenTo = await getTokenByAddress(searchParams.to);
  }
  const allTokens = await getAllTokens();

  return (
    <div>
      <TokensDisplay
        tokenIn={tokenFrom}
        tokenOut={tokenTo}
        allTokens={allTokens}
      />
    </div>
  )
}

export default Home;