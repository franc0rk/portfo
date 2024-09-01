// services/binanceService.ts
import axios from "axios";

interface TickerResponse {
  symbol: string;
  price: string;
}

class BinanceService {
  private static instance: BinanceService;
  private baseURL: string;

  private constructor() {
    this.baseURL = "https://api.binance.com/api/v3"; // Binance API base URL
  }

  static getInstance(): BinanceService {
    if (!BinanceService.instance) {
      BinanceService.instance = new BinanceService();
    }
    return BinanceService.instance;
  }

  async getTicker(): Promise<TickerResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/ticker/price`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch ticker: ${error}`);
    }
  }
}

export default BinanceService;
