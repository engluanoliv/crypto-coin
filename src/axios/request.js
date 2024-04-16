import { instance } from './axios.js';

export async function fetchCurrentCoinPrice(ids = 'bitcoin', vsCurrency = 'usd') {

    const validatedIds = encodeURIComponent(ids);
    const validatedVsCurrency = encodeURIComponent(vsCurrency);

    const requestUrl = `simple/price?ids=${validatedIds}&vs_currencies=${validatedVsCurrency}`;

    try {
        const response = await instance(requestUrl);

        return response.data;

    } catch (error) {
        console.error('Error fetching current coin price:', error);
        throw error
    }
}


export async function fetchHistoricalPrice(ids = 'bitcoin', selectedDateTime) {

    const validatedIds = encodeURIComponent(ids);

    const requestUrl = `coins/${validatedIds}/history?date=${selectedDateTime}`;

    try {
        const response = await instance(requestUrl);

        return response.data.market_data.current_price;

    } catch (error) {
        console.error('Error fetching current coin price:', error);
        throw error
    }
}