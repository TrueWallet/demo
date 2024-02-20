import { Component } from '@angular/core';
import { QRCodeModule } from "angularx-qrcode";
import { AsyncPipe, NgIf } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { CdkCopyToClipboard } from "@angular/cdk/clipboard";

import { OperationHeaderComponent } from "../../partials/operation-header/operation-header.component";
import { WalletAddressPipe } from "../../pipes/wallet-address/wallet-address.pipe";
import { WalletService } from "../../services/wallet/wallet.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-asset-receive',
  standalone: true,
  imports: [QRCodeModule, OperationHeaderComponent, AsyncPipe, NgIf, MatIconButton, MatIcon, CdkCopyToClipboard, WalletAddressPipe],
  templateUrl: './asset-receive.component.html',
  styleUrl: './asset-receive.component.scss'
})
export class AssetReceiveComponent {
  walletAddress: string;
  tokenSymbol: string;

  constructor(
    private route: ActivatedRoute,
    private wallet: WalletService,
  ) {
    this.tokenSymbol = this.route.snapshot.params['token'] || null;
    this.walletAddress = this.wallet.address;
  }
}
