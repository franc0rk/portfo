export interface Ticker {
  symbol: string;
  price: string;
}

export interface TickerDictionary {
  [key: string]: Ticker;
}
