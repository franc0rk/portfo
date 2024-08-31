import { IAsset } from "@/app/models/asset";

interface AssetCardProps {
  asset: IAsset;
}

export default function AssetCard({ asset }: AssetCardProps) {
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
      </div>
    </div>
  );
}
