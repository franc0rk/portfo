export interface IAsset {
  id: number;
  ticker: string;
  amount: number;
  entry: number;
  group: AssetGroupType;
  currency: CurrencyType;
  attachedUrl: string;
  platform: PlatformType;
}

export type AssetGroupType =
  | "crypto"
  | "stocks"
  | "realestate"
  | "bonds"
  | "nft";

export type CurrencyType = "usd" | "mxn";

export type PlatformType = "binance" | "bitget" | "gbm" | "other";
