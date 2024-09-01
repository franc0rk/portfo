"use client";
import { AssetGroupType, CurrencyType, IAsset } from "@/app/models/asset";
import { emptyAssetMock } from "@/app/state/mocks/mock-assets";
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
    onSubmit(form);
    setIsAdding(false);
    setForm(emptyAssetMock);
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
      <form onSubmit={handleSubmit}>
        <div className="border rounded-md h-full w-full px-2 relative">
          {error && (
            <div className="absolute right-0 -top-4 text-xs text-red-500">
              {error}
            </div>
          )}
          <input
            className="bg-transparent text-xs border-b border-dotted w-full"
            placeholder="ticker"
            value={form.ticker}
            onChange={(e) => setForm({ ...form, ticker: e.target.value })}
          />
          <input
            className="bg-transparent text-xs border rounded-md border-dotted w-1/2 pl-1"
            placeholder="amount"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />
          <input
            className="bg-transparent text-xs border rounded-md border-dotted w-1/2 pl-1"
            placeholder="entry"
            type="number"
            value={form.entry}
            onChange={(e) =>
              setForm({ ...form, entry: Number(e.target.value) })
            }
          />
          <select
            className="bg-transparent text-xs w-full border rounded-md"
            value={form.group}
            onChange={(e) =>
              setForm({ ...form, group: e.target.value as AssetGroupType })
            }
          >
            <option className="bg-black" value="crypto">
              crypto
            </option>
            <option className="bg-black" value="stocks">
              stocks
            </option>
            <option className="bg-black" value="realestate">
              realestate
            </option>
            <option className="bg-black" value="bonds">
              bonds
            </option>
            <option className="bg-black" value="nft">
              nft
            </option>
          </select>
          <input
            className="bg-transparent text-xs border-b border-dotted w-full"
            placeholder="attachedUrl"
            value={form.attachedUrl}
            onChange={(e) => setForm({ ...form, attachedUrl: e.target.value })}
          />
          <select
            className="bg-transparent text-xs w-2/4 border rounded-md"
            value={form.currency}
            onChange={(e) =>
              setForm({ ...form, currency: e.target.value as CurrencyType })
            }
          >
            <option className="bg-black" value="usd">
              usd
            </option>
            <option className="bg-black" value="mxn">
              mxn
            </option>
          </select>
          <input
            className="bg-transparent text-xs border rounded-md ml-2 w-10"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    );
  }

  return (
    <button
      className="border rounded-md h-full w-full"
      onClick={() => setIsAdding(true)}
    >
      Add
    </button>
  );
}
