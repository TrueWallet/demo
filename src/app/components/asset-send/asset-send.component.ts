import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, DecimalPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  Observable,
  switchMap,
} from "rxjs";
import { MatOption, MatSelect } from "@angular/material/select";

import { Asset } from "../../interfaces/asset";
import { LoadingButtonComponent } from "../../partials/loading-button/loading-button.component";
import { OperationHeaderComponent } from "../../partials/operation-header/operation-header.component";
import { WalletService } from "../../services/wallet/wallet.service";
import { ActivatedRoute } from "@angular/router";
import { AppValidators } from "../../etc/app-validators";
import { MatIcon } from "@angular/material/icon";
import { InfoTriggerComponent } from "../../partials/info-trigger/info-trigger.component";

@Component({
  selector: 'app-asset-send',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatInput,
    MatHint,
    MatLabel,
    MatError,
    AsyncPipe,
    DecimalPipe,
    MatSuffix,
    ReactiveFormsModule,
    NgIf,
    OperationHeaderComponent,
    MatSelect,
    MatOption,
    NgForOf,
    LoadingButtonComponent,
    InfoTriggerComponent,
  ],
  templateUrl: './asset-send.component.html',
  styleUrl: './asset-send.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetSendComponent {
  token: Asset | null;
  balance$: Observable<string>;
  nativeBalance$: Observable<string>;

  form: FormGroup;

  refresh$$: BehaviorSubject<number> = new BehaviorSubject<number>( 0);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private wallet: WalletService,
  ) {
    const symbol = this.route.snapshot.params['token'] || null;
    this.token = this.wallet.getAsset(symbol);

    this.nativeBalance$ = this.refresh$$.pipe(
      distinctUntilChanged(),
      switchMap(() => this.wallet.getBalance()),
    );

    this.balance$ = this.refresh$$.pipe(
      distinctUntilChanged(),
      switchMap(() => this.token ? this.wallet.getERC20Balance(this.token.address) : this.wallet.getBalance()),
    );

    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      amount: new FormControl('',
        [Validators.required],
        [AppValidators.feeBalance(this.nativeBalance$), AppValidators.insufficientBalance(this.balance$)],
      ),
    });
  }

  send(): void {
    this.loading$.next(true);
    this.wallet.sendAsset(this.token, this.form.value).pipe(
      finalize(() => this.loading$.next(false)),
    ).subscribe(() => {
      this.form.reset();
      this.refresh$$.next(this.refresh$$.value + 1);
    });
  }
}
