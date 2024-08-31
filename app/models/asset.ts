export interface IAsset {
  ticker: string;
  amount: number;
  entry: number;
  group: AssetGroupType;
  currency: CurrencyType;
  attachedUrl: string;
}

export type AssetGroupType =
  | "crypto"
  | "stocks"
  | "realestate"
  | "bonds"
  | "nft";

export type CurrencyType = "usd" | "mxn";
