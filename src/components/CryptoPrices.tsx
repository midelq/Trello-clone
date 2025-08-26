import React, { useEffect, useState } from 'react';

interface CryptoPrices {
  bitcoin: { usd: number, usd_24h_change: number };
  ethereum: { usd: number, usd_24h_change: number };
  solana: { usd: number, usd_24h_change: number };
}

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrices | null>(null);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    // Fetch initial prices
    fetchCryptoPrices();

    // Update prices every 60 seconds
    const interval = setInterval(fetchCryptoPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Loading...';
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const PriceChange: React.FC<{ change: number }> = ({ change }) => {
    const isPositive = change > 0;
    const color = isPositive ? 'text-green-400' : 'text-red-400';
    const arrow = isPositive ? '↑' : '↓';
    
    return (
      <span className={`${color} ml-2`}>
        {arrow} {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center p-2 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
        <span className="font-medium text-purple-700">BTC</span>
        <div className="flex items-center">
          <span className="text-purple-900">
            {prices ? formatPrice(prices.bitcoin.usd) : 'Loading...'}
          </span>
          {prices && <PriceChange change={prices.bitcoin.usd_24h_change} />}
        </div>
      </div>
      <div className="flex justify-between items-center p-2 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
        <span className="font-medium text-purple-700">ETH</span>
        <div className="flex items-center">
          <span className="text-purple-900">
            {prices ? formatPrice(prices.ethereum.usd) : 'Loading...'}
          </span>
          {prices && <PriceChange change={prices.ethereum.usd_24h_change} />}
        </div>
      </div>
      <div className="flex justify-between items-center p-2 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
        <span className="font-medium text-purple-700">SOL</span>
        <div className="flex items-center">
          <span className="text-purple-900">
            {prices ? formatPrice(prices.solana.usd) : 'Loading...'}
          </span>
          {prices && <PriceChange change={prices.solana.usd_24h_change} />}
        </div>
      </div>
    </div>
  );
};

export default CryptoPrices;
