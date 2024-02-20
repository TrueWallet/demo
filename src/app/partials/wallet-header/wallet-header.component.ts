import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatButton } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";
import { chains } from "../../constants/chains";
import { Chain } from "../../interfaces/chain";

@Component({
  selector: 'app-wallet-header',
  standalone: true,
  imports: [
    RouterLink,
    MatMenu,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './wallet-header.component.html',
  styleUrl: './wallet-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletHeaderComponent {
  protected readonly chains: Chain[] = chains;

  protected currentChain: Chain = this.chains[0];
}
