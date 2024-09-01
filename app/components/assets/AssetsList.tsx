"use client";
import { useState, useEffect } from "react";
import { IAsset } from "../../models/asset";
import { assetsMock } from "../../state/mocks/mock-assets";
import AssetForm from "./AssetForm";
import AssetCard from "./AssetCard";
import LocalStorageService from "@/app/services/assetsLocalStorageService";
import BinanceService from "@/app/services/binanceService";
import { keyBy } from "lodash";
import { TickerDictionary } from "@/app/models/ticker";

export default function AssetsList() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [prices, setPrices] = useState<TickerDictionary>({});
  const localStorageService = LocalStorageService.getInstance();

  useEffect(() => {
    const binanceService = BinanceService.getInstance();

    const fetchTicker = async () => {
      try {
        const ticker = await binanceService.getTicker();
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
    }
  }, [localStorageService]);

  useEffect(() => {
    localStorageService.setAssets(assets);
  }, [assets, localStorageService]);

  const renderedAssets = assets.map((asset, assetIndex) => (
    <AssetCard key={assetIndex} asset={asset} prices={prices} />
  ));

  function handleSubmitForm(event: IAsset) {
    const updatedAssets = [...assets, event];
    setAssets(updatedAssets);
  }

  return (
    <div className="flex flex-wrap">
      {renderedAssets}
      <div className="w-32 h-24">
        <AssetForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
}
