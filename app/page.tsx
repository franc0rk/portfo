"use client";
import { useEffect } from "react";
import AssetsList from "./components/assets/AssetsList";
import useStore from "./hooks/useStore";
import LocalStorageService from "@/app/services/assetsLocalStorageService";
import BinanceService from "./services/binanceService";

import { assetsMock } from "./state/mocks/mock-assets";
import {
  assetWithPnl,
  calculateTotal,
  calculateTotalPnL,
} from "./utils/mappings";
import { keyBy, sortBy } from "lodash";
import { IAsset } from "./models/asset";
import { Ticker } from "./models/ticker";
import { getPositiveNegativeStyle } from "./utils/styles";

const localStorageService = LocalStorageService.getInstance();
const binanceService = BinanceService.getInstance();

export default function Home() {
  const { assets, setAssets, binanceTickers, setBinanceTickers } = useStore();

  useEffect(() => {
    const storedAssets = localStorageService.getAssets();
    if (storedAssets.length > 0) {
      setAssets(storedAssets);
    } else {
      setAssets(assetsMock);
    }
  }, [localStorageService]);

  useEffect(() => {
    fetchTickers();
    async function fetchTickers() {
      const ticker: Ticker[] = await binanceService.getTicker();
      setBinanceTickers(keyBy(ticker, "symbol"));
    }
  }, []);

  function sortAssets(field: keyof IAsset, order: "asc" | "desc") {
    const transformedAssets = assets.map((a) =>
      assetWithPnl(a, binanceTickers)
    );

    const sortedAssets = sortBy(transformedAssets, [field]);
    if (order === "desc") {
      sortedAssets.reverse();
    }
    setAssets(sortedAssets);
  }

  const totalPnL = calculateTotalPnL(assets, binanceTickers);
  const total = calculateTotal(assets, binanceTickers);

  return (
    <div>
      <section>
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-100 text-opacity-80 my-4">
            Portfolio Name
          </h2>
          <div className="text-xl my-2">
            <span className="font-bold">PNL:</span>
            <span className={`ml-1 text-${getPositiveNegativeStyle(totalPnL)}`}>
              ${totalPnL.toFixed(2)}
            </span>
            <span className="mx-2">-</span>
            <span className="font-bold">Total:</span>
            <span className="ml-1">${total.toFixed(2)}</span>
          </div>
        </div>
      </section>
      <section>
        <AssetsList assets={assets} onSort={sortAssets} />
      </section>
    </div>
  );
}
