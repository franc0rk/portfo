import { IAsset } from "../models/asset";
import { TickerDictionary } from "../models/ticker";

export function assetWithPnl(asset: IAsset, tickers: TickerDictionary) {
  const price = tickers[asset.ticker]?.price;
  const assetTickerPrice = Number(price);

  return {
    ...asset,
    pnl: assetTickerPrice * asset.amount - asset.entry * asset.amount,
    pnlPercentage: (assetTickerPrice * 100) / asset.entry - 100,
  };
}

export function calculateTotalPnL(
  assets: IAsset[],
  tickers: TickerDictionary
): number {
  return assets.reduce((totalPnL, asset) => {
    const assetTickerPrice: number = tickers[asset.ticker]
      ? Number(tickers[asset.ticker].price)
      : 0;
    const assetPnl = (assetTickerPrice - asset.entry) * asset.amount;
    return totalPnL + assetPnl;
  }, 0);
}

export function calculateTotal(
  assets: IAsset[],
  tickers: TickerDictionary
): number {
  return assets.reduce((totalPnL, asset) => {
    const assetTickerPrice: number = tickers[asset.ticker]
      ? Number(tickers[asset.ticker].price)
      : 0;
    const assetPnl = assetTickerPrice * asset.amount;
    return totalPnL + assetPnl;
  }, 0);
}
