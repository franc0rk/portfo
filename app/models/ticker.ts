export interface Ticker {
  symbol: string;
  price: string;
}

export interface TickerDictionary {
  [key: string]: Ticker;
}

export function convertTickerDictionaryToArray(
  dictionary: TickerDictionary
): Ticker[] {
  return Object.values(dictionary);
}
