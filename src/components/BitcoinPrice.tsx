import React, { useEffect, useState } from 'react';

const BitcoinPrice: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.bitcoin.usd.toLocaleString('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }));
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    // Fetch initial price
    fetchBitcoinPrice();

    // Update price every 60 seconds
    const interval = setInterval(fetchBitcoinPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="bitcoin-price">
      {price ? `BTC: ${price}` : 'Loading...'}
    </span>
  );
};

export default BitcoinPrice;
