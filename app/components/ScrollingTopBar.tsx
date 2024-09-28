import useStore from "../hooks/useStore";
import { convertTickerDictionaryToArray } from "../models/ticker";

export default function ScrollingTopBar() {
  const { binanceTickers: tickers } = useStore();

  const tickersArray = convertTickerDictionaryToArray(tickers);

  return (
    <div className="w-full bg-purple-800 rounded-full text-white overflow-hidden relative">
      <div className="scrolling-content flex whitespace-nowrap animate-scroll">
        {tickersArray.map((ticker) => (
          <div className="mx-4" key={ticker.symbol}>
            <span className="font-bold">{ticker.symbol}</span>: {ticker.price}
          </div>
        ))}
      </div>
    </div>
  );
}
