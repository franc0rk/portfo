import { IAsset } from "@/app/models/asset";
import { TickerDictionary } from "@/app/models/ticker";
import { getAssetPnlLabelStyle } from "@/app/utils/styles";

interface AssetCardProps {
  asset: IAsset;
  prices: TickerDictionary;
}

export default function AssetCard({ asset, prices }: AssetCardProps) {
  const assetTickerPrice = Number(prices[asset.ticker]?.price);
  const assetPnl = (assetTickerPrice - asset.entry) * asset.amount;
  const assetPnlPercentage = (assetTickerPrice * 100) / asset.entry - 100;

  const labelColorStyle = getAssetPnlLabelStyle(assetPnlPercentage);

  return (
    <div className="w-32 h-24 mr-4 border">
      <div className="flex flex-col p-1">
        <div className="text-sm max-w-full overflow-hidden text-ellipsis">
          <span className="font-semibold">{asset.ticker}</span>
          {asset.ticker.includes("BTC") ? (
            <small className="font-xs">({asset.amount.toFixed(8)})</small>
          ) : (
            <small className="font-xs">({asset.amount.toFixed(2)})</small>
          )}
        </div>
        <div className="text-xs">Entry: {asset.entry}</div>
        <div className="text-xs">Price: ${assetTickerPrice.toFixed(4)}</div>
        <div className={`text-xs ${labelColorStyle}`}>
          {assetPnlPercentage.toFixed(1)}%
        </div>
        <div className={`text-xs ${labelColorStyle}`}>
          Pnl: ${assetPnl.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
