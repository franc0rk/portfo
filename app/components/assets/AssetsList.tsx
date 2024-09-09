"use client";
import { useState, useEffect } from "react";
import { IAsset } from "../../models/asset";
import { assetsMock } from "../../state/mocks/mock-assets";
import AssetForm from "./AssetForm";
import AssetCard from "./AssetCard";
import LocalStorageService from "@/app/services/assetsLocalStorageService";
import BinanceService from "@/app/services/binanceService";
import { keyBy } from "lodash";
import { Ticker, TickerDictionary } from "@/app/models/ticker";
import { getAssetPnlStyle } from "@/app/utils/styles";

export default function AssetsList() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [assetEditing, setAssetEditing] = useState<IAsset | null>(null);
  const [prices, setPrices] = useState<TickerDictionary>({});
  const localStorageService = LocalStorageService.getInstance();

  useEffect(() => {
    const binanceService = BinanceService.getInstance();

    const fetchTicker = async () => {
      try {
        const ticker: Ticker[] = await binanceService.getTicker();
        setPrices(keyBy(ticker, "symbol"));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicker();
  }, []);

  useEffect(() => {
    const storedAssets = localStorageService.getAssets();
    if (storedAssets.length > 0) {
      setAssets(storedAssets);
    } else {
      setAssets(assetsMock);
    }
  }, [localStorageService]);

  useEffect(() => {
    localStorageService.setAssets(assets);
  }, [assets, localStorageService]);

  const calculateTotalPnL = () => {
    return assets.reduce((totalPnL, asset) => {
      const assetTickerPrice: number = prices[asset.ticker]
        ? Number(prices[asset.ticker].price)
        : 0;
      const assetPnl = (assetTickerPrice - asset.entry) * asset.amount;
      return totalPnL + assetPnl;
    }, 0);
  };

  const calculateTotal = () => {
    return assets.reduce((totalPnL, asset) => {
      const assetTickerPrice: number = prices[asset.ticker]
        ? Number(prices[asset.ticker].price)
        : 0;
      const assetPnl = assetTickerPrice * asset.amount;
      return totalPnL + assetPnl;
    }, 0);
  };

  const renderedAssets = assets.map((asset) => (
    <AssetCard
      key={asset.id}
      asset={asset}
      prices={prices}
      onDelete={handleRemoveAsset}
      onEdit={handleEditAsset}
    />
  ));

  function handleSubmitForm(event: IAsset): void {
    let updatedAssets = [...assets];

    if (isEditing) {
      setAssets(
        updatedAssets.map((a) => (a.id === assetEditing?.id ? event : a))
      );
      setIsEditing(false);
      return;
    }

    setAssets([...updatedAssets, event]);
    setAssetEditing(null);
  }

  function handleRemoveAsset(asset: IAsset): void {
    const updatedAssets = assets.filter((a) => a.id !== asset.id);
    setAssets(updatedAssets);
  }

  function handleEditAsset(asset: IAsset): void {
    setIsEditing(true);
    setAssetEditing(asset);
  }

  const totalPnL = calculateTotalPnL();
  const total = calculateTotal();

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="text-xl mb-2">
          PNL:&nbsp;
          <span className={`text-${getAssetPnlStyle(totalPnL)}`}>
            ${totalPnL.toFixed(2)}&nbsp;
          </span>
          - Total: ${total.toFixed(2)}
        </div>
      </div>
      {renderedAssets}
      <div className="w-52 h-48 overflow-auto border-2 bg-gray-900 border-gray-700 rounded-md">
        <AssetForm assetEditing={assetEditing} onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
}
