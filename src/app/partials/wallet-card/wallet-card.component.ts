import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from "@angular/common";
import { InfoTriggerComponent } from "../info-trigger/info-trigger.component";
import { WalletAddressPipe } from "../../pipes/wallet-address/wallet-address.pipe";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    InfoTriggerComponent,
    WalletAddressPipe
  ],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss',
  animations: [
    trigger('zoomInZoomOut', [
      state('scaled', style({transform: 'scale(0.99)'})),
      state('normal', style({transform: 'scale(1)'})),
      transition('normal <=> scaled', [
        animate('0.2s ease')
      ]),
    ])
  ]
})
export class WalletCardComponent {
  @Input() address: string | null = null
  @Input() balance$: Promise<string> | null = null;

  @HostBinding('@zoomInZoomOut') animationState: 'normal' | 'scaled' = 'normal';
  @HostListener('click') triggerAnimation(): void {
    this.animationState = 'scaled';
    setTimeout(() => this.animationState = 'normal', 200);
  }
}
