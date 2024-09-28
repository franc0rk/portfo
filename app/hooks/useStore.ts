import { create } from "zustand";
import { IAsset } from "../models/asset";
import { TickerDictionary } from "../models/ticker";

interface StoreState {
  isLoading: boolean;
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
  binanceTickers: TickerDictionary;
  setBinanceTickers: (tickers: TickerDictionary) => void;
}

const useStore = create<StoreState>()((set) => ({
  isLoading: false,
  assets: [],
  binanceTickers: {},
  setIsLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isLoading })),
  setAssets: (assets: IAsset[]) => set((state) => ({ ...state, assets })),
  setBinanceTickers: (binanceTickers: TickerDictionary) =>
    set((state) => ({ ...state, binanceTickers })),
}));

export default useStore;
