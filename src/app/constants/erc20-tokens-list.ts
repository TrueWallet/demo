import { AssetOperation } from "./asset-operation";
import { Addresses } from "./addresses";
import { Asset } from "../interfaces/asset";

export const ERC20TokensList: Omit<Asset, 'balance'>[] = [
  {
    address: Addresses.TKN1,
    title: 'TKN1',
    symbol: 'TKN1',
    operations: [AssetOperation.send, AssetOperation.receive, AssetOperation.deposit],
  },
  {
    address: Addresses.TKN2,
    title: 'TKN2',
    symbol: 'TKN2',
    operations: [AssetOperation.send, AssetOperation.receive, AssetOperation.deposit],
  }
];
