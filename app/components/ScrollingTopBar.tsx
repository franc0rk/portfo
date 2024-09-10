import {
  convertTickerDictionaryToArray,
  TickerDictionary,
} from "../models/ticker";

interface ScrollingTopBarProps {
  tickers: TickerDictionary;
}

export default function ScrollingTopBar({ tickers }: ScrollingTopBarProps) {
  const tickersArray = convertTickerDictionaryToArray(tickers);

  return (
    <div className="w-full bg-purple-800 rounded-full text-white overflow-hidden relative">
      <div className="scrolling-content flex whitespace-nowrap animate-scroll">
        {tickersArray.map((ticker) => (
          <div className="mx-4">
            <span className="font-bold">{ticker.symbol}</span>: {ticker.price}
          </div>
        ))}
      </div>
    </div>
  );
}
