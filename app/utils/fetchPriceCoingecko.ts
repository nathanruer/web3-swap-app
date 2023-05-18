import axios from 'axios';

export async function fetchPriceCoingecko(cryptoId: string, amount: number): Promise<number | null> {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
    const data = response.data;
    
    if (data && data[cryptoId] && data[cryptoId].usd) {
      const price = amount * data[cryptoId].usd;
      return price;
    }
    
    return null;
  } catch (error) {
    console.log(`Error retrieving crypto price: ${error}`);
    return null;
  }
}
