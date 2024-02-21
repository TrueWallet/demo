import { Routes } from '@angular/router';
import { AssetOperation } from "./constants/asset-operation";

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./components/wallet/wallet.component').then((c: any) => c.WalletComponent),
  data: { snippet: '/assets/snippets/init.md' },
}, {
  path: AssetOperation.send.toLowerCase(),
  pathMatch: 'full',
  loadComponent: () => import('./components/asset-send/asset-send.component').then((c: any) => c.AssetSendComponent),
  data: { snippet: '/assets/snippets/send.md' },
}, {
  path: `${AssetOperation.send.toLowerCase()}/:token`,
  loadComponent: () => import('./components/asset-send/asset-send.component').then((c: any) => c.AssetSendComponent),
  data: { snippet: '/assets/snippets/send-erc20.md' },
}, {
  path: AssetOperation.receive.toLowerCase(),
  pathMatch: 'full',
  loadComponent: () => import('./components/asset-receive/asset-receive.component').then((c: any) => c.AssetReceiveComponent),
  data: { snippet: '/assets/snippets/receive.md' },
}, {
  path: `${AssetOperation.receive.toLowerCase()}/:token`,
  loadComponent: () => import('./components/asset-receive/asset-receive.component').then((c: any) => c.AssetReceiveComponent),
  data: { snippet: '/assets/snippets/receive.md' },
}, {
  path: ':token',
  loadComponent: () => import('./components/asset-details/asset-details.component').then((c: any) => c.AssetDetailsComponent),
  data: { snippet: '/assets/snippets/erc-20.md' },
}];
