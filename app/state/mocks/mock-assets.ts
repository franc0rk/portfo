import { IAsset } from "@/app/models/asset";

export const assetsMock: IAsset[] = [
  {
    id: 1,
    amount: 10,
    attachedUrl: "#",
    currency: "usd",
    group: "crypto",
    ticker: "TIAUSDT",
    entry: 4.458,
  },
  {
    id: 2,
    amount: 101,
    attachedUrl: "#",
    currency: "usd",
    group: "crypto",
    ticker: "GRTUSDT",
    entry: 0.1453,
  },
  {
    id: 3,
    amount: 2,
    attachedUrl: "#",
    currency: "usd",
    group: "crypto",
    ticker: "LINKUSDT",
    entry: 11.24,
  },
  {
    id: 4,
    amount: 0.01,
    attachedUrl: "#",
    currency: "usd",
    group: "crypto",
    ticker: "ETHUSDT",
    entry: 2441.23,
  },
];

export const emptyAssetMock: IAsset = {
  id: 0,
  amount: 0,
  attachedUrl: "#",
  currency: "usd",
  group: "crypto",
  ticker: "",
  entry: 0,
};
