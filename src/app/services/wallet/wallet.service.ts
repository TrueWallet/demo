import { Injectable } from '@angular/core';
import { initTrueWallet } from "@truewallet/sdk";
import { TrueWalletSDK } from "@truewallet/sdk/dist/cjs/TrueWalletSDK";
import { Asset } from "../../interfaces/asset";
import { catchError, from, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { ERC20TokensList } from "../../constants/erc20-tokens-list";
import { NotificationsService } from "../notifications/notifications.service";
import { UserOperationResponse } from "@truewallet/sdk/dist/esm/user-operation-builder/user-operation-data";

export interface SendData {
  address: string;
  amount: string;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private wallet!: TrueWalletSDK;

  get address(): string {
    return this.wallet.address;
  }

  constructor(private notifications: NotificationsService) {}

  async init(): Promise<void>{
    const salt = this.getSalt();

    try {
      this.wallet = await initTrueWallet({
        signer: {
          type: 'salt',
          data: [salt],
        },
        // FIXME: env:
        bundlerUrl: 'https://amoy.true-wallet.io/v1/rpc/d5d1855a-d570-47f8-a680-4eee2fd0a616'
      });
    } catch (e: any) {
      this.notifications.warning({
        title: 'Wallet initialization failed',
        message: e.message,
      })
    }
  }

  async getBalance(): Promise<string> {
    return await this.wallet.getBalance();
  }

  async getERC20Balance(address: string): Promise<string> {
    return await this.wallet.getERC20Balance(address);
  }

  sendAsset(token: Asset | null, data: SendData): Observable<any> {
    return from(this.getSendOperation(token, data)).pipe(
      switchMap((response: UserOperationResponse) => response.wait()),
      catchError((error) => {
        console.dir(error);
        this.notifications.warning({
          title: 'An error occurred',
          message: error.message,
        });
        return throwError(() => error);
      }),
      tap(() => this.notifications.success({
        title: 'Operation successful.',
        message: `You have successfully sent ${data.amount} ${token?.symbol || 'MATIC'} to ${data.address}`,
      })),
    );
  }

  private async getSendOperation(token: Asset | null, data: SendData): Promise<any> {
    return token ?
      this.wallet.sendErc20({to: token.address, amount: data.amount.toString(), tokenAddress: token.address}) :
      this.wallet.send({to: data.address, amount: data.amount.toString()});
  }

  getAsset(symbol: string | null): Asset | null {
    if (symbol) {
      const asset  = ERC20TokensList.find((token) => token.symbol.toLowerCase() === symbol.toLowerCase());

      if (asset) {
        return {
          ...asset,
          balance: this.wallet.getERC20Balance(asset.address),
        };
      } else {
        this.notifications.warning({
          title: 'Token not supported',
          message: 'The token you are trying to access is not supported.',
        });
      }
    }

    return null;
  }

  getTokensList(): Observable<Asset[]> {
    return of(ERC20TokensList).pipe(
      map((tokens) => tokens.map((token) => ({
        ...token,
        balance: this.wallet.getERC20Balance(token.address),
      })))
    );
  }

  // FIXME: type
  async deposit(token: Asset): Promise<any> {
    try {
      const response = await this.wallet.contractCall({
        address: token.address,
        abi: ['function mintTo(address _to, uint256 _amount) external'],
        method: 'mintTo',
        args: [this.wallet.address, '10000000000000000000'],
      });

      const receipt = await response.wait();

      this.notifications.success({
        title: 'Deposit successful',
        message: `You have successfully deposited 10 ${token.symbol} to your wallet.`,
      });

      return receipt;
    } catch (e: any) {
      this.notifications.warning({
        title: 'Deposit failed',
        message: e.message,
      });
    }
  }

  private getSalt() {
    /**
     * This is only for demonstration purposes.
     * DO NOT use this generation method in your production.
     * */
    let salt = localStorage.getItem('salt');

    if (salt) {
      return salt;
    }

    salt = crypto.randomUUID();
    localStorage.setItem('salt', salt);
    return salt;
  }
}
