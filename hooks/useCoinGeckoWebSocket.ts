'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/coingecko.actions';

export const useCoinGeckoWebSocket = ({
    coinId,
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
    const [price, setPrice] = useState<ExtendedPriceData | null>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsConnected(true);

        const fetchData = async () => {
            // Fetch Price Data
            try {
                const priceData = await fetcher<Record<string, any>>('/simple/price', {
                    ids: coinId,
                    vs_currencies: 'usd',
                    include_market_cap: 'true',
                    include_24hr_vol: 'true',
                    include_24hr_change: 'true',
                    include_last_updated_at: 'true',
                }, 30);

                if (isMounted && priceData && priceData[coinId]) {
                    const data = priceData[coinId];
                    setPrice({
                        usd: data.usd,
                        change24h: data.usd_24h_change,
                        marketCap: data.usd_market_cap,
                        volume24h: data.usd_24h_vol,
                        timestamp: data.last_updated_at ? data.last_updated_at * 1000 : Date.now(),
                    });
                }
            } catch (error) {
                console.error('Polling Error (Price):', error);
            }

            // Fetch OHLC Data
            try {
                const ohlcData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
                    vs_currency: 'usd',
                    days: 1,
                    precision: 'full',
                }, 60);

                if (isMounted && Array.isArray(ohlcData) && ohlcData.length > 0) {
                    // CoinGecko OHLC: [time, open, high, low, close]
                    const latest = ohlcData[ohlcData.length - 1];
                    setOhlcv(latest);
                }
            } catch (error) {
                console.error('Polling Error (OHLC):', error);
            }
        };

        fetchData(); // Initial immediate fetch

        const interval = setInterval(fetchData, 30000); // Poll every 30 seconds

        return () => {
            isMounted = false;
            clearInterval(interval);
            setIsConnected(false);
        };
    }, [coinId]);

    // Return empty trades as unrestricted API doesn't support trade history streaming easily
    return {
        price,
        trades,
        ohlcv,
        isConnected,
    };
};