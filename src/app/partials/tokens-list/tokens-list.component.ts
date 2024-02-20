import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import { MatListModule } from "@angular/material/list";
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { WalletService } from "../../services/wallet/wallet.service";
import { RouterLink } from "@angular/router";
import { Asset } from "../../interfaces/asset";
import { IndenticonPipe } from "../../pipes/indenticon/indenticon.pipe";

@Component({
  selector: 'app-tokens-list',
  standalone: true,
  imports: [
    MatListModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatButtonModule,
    DecimalPipe,
    RouterLink,
    IndenticonPipe,
  ],
  templateUrl: './tokens-list.component.html',
  styleUrl: './tokens-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokensListComponent {
  tokens$: Observable<Asset[]>;

  constructor(
    private wallet: WalletService,
  ) {
    this.tokens$ = this.wallet.getTokensList();
  }
}
