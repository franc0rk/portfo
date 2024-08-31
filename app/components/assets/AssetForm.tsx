"use client";
import { IAsset } from "@/app/models/asset";
import { useState } from "react";

interface AssetFormProps {
  onSubmit: (formData: IAsset) => void;
}

export default function AssetForm({ onSubmit }: AssetFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<IAsset>({
    amount: 0,
    attachedUrl: "#",
    currency: "usd",
    group: "crypto",
    ticker: "",
    entry: 0,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!isFormValid(form)) {
      setError("Invalid form");
      return;
    }
    onSubmit(form);
    setIsAdding(false); // Optionally close the form after submit
  }

  function isFormValid(form: IAsset): boolean {
    return Boolean(
      form.ticker && form.currency && form.group && form.amount > 0
    );
  }

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
            onChange={(e) => setForm({ ...form, group: e.target.value })}
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
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
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
