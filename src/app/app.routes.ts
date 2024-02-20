import { Routes } from '@angular/router';
import { AssetOperation } from "./constants/asset-operation";

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./components/wallet/wallet.component').then((c: any) => c.WalletComponent),
}, {
  path: AssetOperation.send.toLowerCase(),
  pathMatch: 'full',
  loadComponent: () => import('./components/asset-send/asset-send.component').then((c: any) => c.AssetSendComponent),
}, {
  path: `${AssetOperation.send.toLowerCase()}/:token`,
  loadComponent: () => import('./components/asset-send/asset-send.component').then((c: any) => c.AssetSendComponent),
}, {
  path: AssetOperation.receive.toLowerCase(),
  pathMatch: 'full',
  loadComponent: () => import('./components/asset-receive/asset-receive.component').then((c: any) => c.AssetReceiveComponent),
}, {
  path: `${AssetOperation.receive.toLowerCase()}/:token`,
  loadComponent: () => import('./components/asset-receive/asset-receive.component').then((c: any) => c.AssetReceiveComponent),
}, {
  path: ':token',
  loadComponent: () => import('./components/asset-details/asset-details.component').then((c: any) => c.AssetDetailsComponent),
}];
