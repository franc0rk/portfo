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
import ScrollingTopBar from "../ScrollingTopBar";

export default function AssetsList() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [assetEditing, setAssetEditing] = useState<IAsset | null>(null);
  const [prices, setPrices] = useState<TickerDictionary>({});
  const localStorageService = LocalStorageService.getInstance();

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const sortAssets = (field: keyof IAsset, order: "asc" | "desc") => {
    setAssets(() => {
      const sortedAssets = assets.map(withPnl).sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
      });

      return sortedAssets;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split(":");
    setSortField(field);
    setSortOrder(order);
    sortAssets(field as keyof IAsset, order as "asc" | "desc");
  };

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

    setAssets([...updatedAssets, event].map(withPnl));
    setAssetEditing(null);
  }

  function withPnl(a: IAsset) {
    const assetTickerPrice = Number(prices[a.ticker]?.price);
    return {
      ...a,
      pnl: (assetTickerPrice - a.entry) * a.amount,
      pnlPercentage: (assetTickerPrice * 100) / a.entry - 100,
    };
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

  const sortControls = (
    <div className="w-full flex items-center justify-end my-4 mx-1">
      <label className="text-xs font-bold text-gray-100 text-opacity-80">
        Sort By:
      </label>
      <select
        className="bg-transparent text-xs border rounded-md px-1 ml-2"
        onChange={handleSortChange}
      >
        <option value="">Select one option</option>
        <option value="ticker:asc">Ticker - asc</option>
        <option value="ticker:desc">Ticker - desc</option>
        <option value="pnl:asc">PNL - asc</option>
        <option value="pnl:desc">PNL - desc</option>
        <option value="pnlPercentage:asc">PNL % - asc</option>
        <option value="pnlPercentage:desc">PNL % - desc</option>
        <option value="amount:asc">Amount - asc</option>
        <option value="amount:desc">Amount - desc</option>
        <option value="amount:asc">Value - asc</option>
        <option value="amount:desc">Value - desc</option>
      </select>
    </div>
  );
  return (
    <div className="flex flex-wrap relative">
      <div className="absolute w-full -top-6">
        <ScrollingTopBar tickers={prices} />
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-100 text-opacity-80 my-4">
          Portfolio Name
        </h2>
        <div className="text-xl my-2">
          <span className="font-bold">PNL:</span>
          <span className={`ml-1 text-${getAssetPnlStyle(totalPnL)}`}>
            ${totalPnL.toFixed(2)}
          </span>
          <span className="mx-2">-</span>
          <span className="font-bold">Total:</span>
          <span className="ml-1">${total.toFixed(2)}</span>
        </div>
      </div>
      {sortControls}
      {renderedAssets}
      <div className="w-52 h-48 overflow-auto border-2 bg-gray-900 border-gray-700 rounded-md">
        <AssetForm assetEditing={assetEditing} onSubmit={handleSubmitForm} />
      </div>
    </div>
  );
}
