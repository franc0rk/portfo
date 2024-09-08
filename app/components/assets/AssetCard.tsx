import { IAsset } from "@/app/models/asset";
import { TickerDictionary } from "@/app/models/ticker";
import { getAssetPnlStyle } from "@/app/utils/styles";
import {
  TrashIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
interface AssetCardProps {
  asset: IAsset;
  prices: TickerDictionary;
  onDelete: (asset: IAsset) => void;
  onEdit: (asset: IAsset) => void;
}

export default function AssetCard({
  asset,
  prices,
  onDelete,
  onEdit,
}: AssetCardProps) {
  const assetTickerPrice = Number(prices[asset.ticker]?.price);
  const assetPnl = (assetTickerPrice - asset.entry) * asset.amount;
  const assetPnlPercentage = (assetTickerPrice * 100) / asset.entry - 100;

  const pnlColorStyle = getAssetPnlStyle(assetPnlPercentage);

  const tickerLabel = (
    <div className="flex items-center text-gray-100 text-opacity-80">
      <Image
        src="/images/BTCUSDT.webp"
        alt="Cryptocurrency"
        width={16}
        height={16}
      />
      <div className="font-bold ml-1">
        {asset.ticker.replace("USDT", "")}&nbsp;
      </div>
      {asset.ticker.includes("BTC") ? (
        <div className="text-xs">{asset.amount.toFixed(4)}</div>
      ) : (
        <div className="text-xs">({asset.amount.toFixed(2)})</div>
      )}
      <div className="ml-auto">
        <button>
          <PresentationChartLineIcon className="size-4 text-gray-100 text-opacity-80" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-48 h-48 mb-4 mr-4 border-2 bg-gray-900 border-gray-700 relative rounded-md">
      <div className="flex flex-col p-2">
        {tickerLabel}
        <div className="text-xs mb-1">
          <span className="font-medium border-b border-dotted text-gray-300">
            Entry:
          </span>{" "}
          ${asset.entry}
        </div>
        <div className="text-xs mb-1">
          <span className="font-medium border-b border-dotted text-gray-300">
            Price:
          </span>{" "}
          ${assetTickerPrice.toFixed(4)}
        </div>
        <div className={`font-semibold text-${pnlColorStyle}`}>
          {assetPnlPercentage.toFixed(1)}%
        </div>
        <div className={`font-semibold text-${pnlColorStyle}`}>
          <span className={`border-b border-dotted border-${pnlColorStyle}`}>
            PNL:
          </span>{" "}
          ${assetPnl.toFixed(2)}
        </div>
        <button
          onClick={() => onEdit(asset)}
          className="absolute left-2 bottom-2 border-2 border-blue-600 px-2 py-1 text-xs font-bold rounded-full"
        >
          <DocumentTextIcon className="size-4 text-blue-400" />
        </button>
        <button
          onClick={() => onEdit(asset)}
          className="absolute right-12 bottom-2 border-2 border-gray-600 px-2 py-1 text-xs font-bold rounded-full"
        >
          <PencilIcon className="size-4 text-gray-400" />
        </button>
        <button
          onClick={() => onDelete(asset)}
          className="absolute right-2 bottom-2 border-2 border-red-600 px-2 py-1 text-xs font-bold rounded-full"
        >
          <TrashIcon className="size-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}
