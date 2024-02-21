import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { AssetOperationsComponent } from "../../partials/asset-operations/asset-operations.component";
import { WalletService } from "../../services/wallet/wallet.service";
import { OperationHeaderComponent } from "../../partials/operation-header/operation-header.component";
import { ActivatedRoute } from "@angular/router";
import { Asset } from "../../interfaces/asset";
import { AssetOperation } from "../../constants/asset-operation";
import { IndenticonPipe } from "../../pipes/indenticon/indenticon.pipe";

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [
    AssetOperationsComponent,
    OperationHeaderComponent,
    AsyncPipe,
    DecimalPipe,
    NgIf,
    NgForOf,
    IndenticonPipe
  ],
  templateUrl: './asset-details.component.html',
  styleUrl: './asset-details.component.scss'
})
export class AssetDetailsComponent {
  private refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  balance$: Observable<string>;
  loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: Asset | null;

  constructor(
    private route: ActivatedRoute,
    private wallet: WalletService,
  ) {
    const symbol = this.route.snapshot.paramMap.get('token');
    this.token = this.wallet.getAsset(symbol);

    if (this.token === null) {
      throw new Error('Token not supported');
    }

    this.balance$ = this.refresh$.pipe(
      switchMap(() => this.wallet.getERC20Balance((<Asset>this.token).address)),
    );
  }

  refreshData(): void {
    this.refresh$.next();
  }

  async onOperation(operation: AssetOperation) {
    if (operation === AssetOperation.deposit) {
      await this.deposit();
    }
  }

  private async deposit(): Promise<void> {
    if (!this.token) {
      return;
    }

    this.loading$$.next(true);
    await this.wallet.deposit(this.token);
    this.refresh$.next();
    this.loading$$.next(false);
  }
}
