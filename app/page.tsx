import getTokenByAddress from "./actions/getTokenByAddress";
import getAllTokens from "./actions/getAllTokens";
import { IPathParams } from "./types/IPathParams";
import Swap from "./components/Swap";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: 'Swap App',
  description: 'By Nathan Ruer',
}

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
      <ClientOnly >
        <Navbar />
        <Swap
          tokenIn={tokenFrom}
          tokenOut={tokenTo}
          allTokens={allTokens}
        />
        <Footer />
      </ClientOnly>
    </div>
  )
}

export default Home;