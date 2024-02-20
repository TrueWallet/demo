import { AssetOperation } from "../constants/asset-operation";

export interface Asset {
  title: string;
  address: string;
  symbol: string;
  operations: AssetOperation[];
  balance?: Promise<string>;
}
