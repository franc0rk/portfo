"use client";
import {
  AssetGroupType,
  CurrencyType,
  IAsset,
  PlatformType,
} from "@/app/models/asset";
import { emptyAssetMock } from "@/app/state/mocks/mock-assets";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

interface AssetFormProps {
  onSubmit: (formData: IAsset) => void;
  assetEditing: IAsset | null;
}

export default function AssetForm({ onSubmit, assetEditing }: AssetFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<IAsset>(emptyAssetMock);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!isFormValid(form)) {
      setError("Invalid form");
      return;
    }
    onSubmit({ ...form, id: Math.floor(Math.random() * 10000) + 9 });
    setIsAdding(false);
    setForm(emptyAssetMock);
    setError("");
  }

  function isFormValid(form: IAsset): boolean {
    return Boolean(
      form.ticker &&
        form.currency &&
        form.group &&
        form.amount > 0 &&
        form.entry > 0
    );
  }

  useEffect(() => {
    if (assetEditing) {
      setForm(assetEditing);
      setIsAdding(!!assetEditing);
    }
  }, [assetEditing]);

  if (isAdding) {
    return (
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 p-4 max-w-md mx-auto"
      >
        {error && <div className="text-xs text-red-600 mb-3">{error}</div>}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-100 text-opacity-80">
            Ticker
          </label>
          <input
            className="bg-transparent text-xs border-b w-full pl-1 py-1"
            placeholder="Ex. BTCUSDT"
            value={form.ticker}
            onChange={(e) => setForm({ ...form, ticker: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
              Shares
            </label>
            <input
              type="number"
              step="0.01"
              className="bg-transparent text-xs border rounded-md w-full pl-1 py-1"
              placeholder="amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
              Entry Price
            </label>
            <input
              type="number"
              step="0.01"
              className="bg-transparent text-xs border rounded-md w-full pl-1 py-1"
              placeholder="entry"
              value={form.entry}
              onChange={(e) =>
                setForm({ ...form, entry: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
              Group
            </label>
            <select
              className="bg-transparent text-xs border rounded-md w-full py-1"
              value={form.group}
              onChange={(e) =>
                setForm({ ...form, group: e.target.value as AssetGroupType })
              }
            >
              <option value="crypto">Crypto</option>
              <option value="stocks">Stocks</option>
              <option value="realestate">Real Estate</option>
              <option value="bonds">Bonds</option>
              <option value="nft">NFT</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
              Platform
            </label>
            <select
              className="bg-transparent text-xs border rounded-md w-full py-1"
              value={form.platform}
              onChange={(e) =>
                setForm({ ...form, platform: e.target.value as PlatformType })
              }
            >
              <option value="binance">Binance</option>
              <option value="bitget">Bitget</option>
              <option value="gbm">Gbm</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col col-span-full">
          <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
            Attached URL
          </label>
          <input
            className="bg-transparent text-xs border-b w-full pl-1 py-1"
            placeholder="attachedUrl"
            value={form.attachedUrl}
            onChange={(e) => setForm({ ...form, attachedUrl: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 col-span-full">
          <div className="flex flex-col">
            <label className="text-xs text-gray-100 text-opacity-80 font-bold mb-1">
              Currency
            </label>
            <select
              className="bg-transparent text-xs border rounded-md w-full py-1"
              value={form.currency}
              onChange={(e) =>
                setForm({ ...form, currency: e.target.value as CurrencyType })
              }
            >
              <option value="usd">USD</option>
              <option value="mxn">MXN</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center col-span-full lg:col-span-1 border-2 border-blue-600 text-blue-400 px-2 py-1 text-xs font-bold rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 hover:text-opacity-80"
          >
            <CheckCircleIcon className="size-4" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      className="h-full w-full flex items-center justify-center text-gray-100 text-opacity-80 transition-colors duration-300 ease-in-out hover:text-gray-500"
      onClick={() => setIsAdding(true)}
    >
      <PlusCircleIcon className="w-8 h-8" />
    </button>
  );
}
