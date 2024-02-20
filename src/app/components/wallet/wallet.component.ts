import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { AsyncPipe, DecimalPipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { InfoTriggerComponent } from "../../partials/info-trigger/info-trigger.component";
import { WalletBalanceSnippet } from "../../constants/snippets";
import { WalletHeaderComponent } from "../../partials/wallet-header/wallet-header.component";
import { WalletCardComponent } from "../../partials/wallet-card/wallet-card.component";
import { AssetOperationsComponent } from "../../partials/asset-operations/asset-operations.component";
import { MatTab, MatTabGroup, MatTabLabel } from "@angular/material/tabs";
import { TokensListComponent } from "../../partials/tokens-list/tokens-list.component";
import { HistoryComponent } from "../../partials/history/history.component";
import { CdkCopyToClipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    MatIcon,
    InfoTriggerComponent,
    WalletCardComponent,
    AssetOperationsComponent,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    TokensListComponent,
    HistoryComponent,
    CdkCopyToClipboard,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {
  @ViewChild('bsContainer', {read: ViewContainerRef}) container: any;

  readonly address: string;
  balance$: Promise<string>;


  constructor(
    private wallet: WalletService,
    protected viewContainerRef: ViewContainerRef,
  ) {
    this.address = this.wallet.address;
    this.balance$ = this.wallet.getBalance();
  }
}
