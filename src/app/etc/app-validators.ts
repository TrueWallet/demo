import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { catchError, firstValueFrom, Observable } from "rxjs";

export class AppValidators {
  static feeBalance(balance$: Observable<string>): AsyncValidatorFn {
    return async (): Promise<ValidationErrors | null> => {
      const balance = await firstValueFrom(balance$);
      if (Number(balance) === 0) {
        return { feeBalance: true };
      }
      return null;
    };
  }

  static insufficientBalance(balance$: Observable<string>): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      try {
        const balance = await firstValueFrom(balance$);
        if (Number(balance) < Number(control.value)) {
          return { insufficientBalance: {error: true, balance} };
        }
      } catch(err) {
        return { insufficientBalance: {error: true, balance: '0'} };
      }
      return null;
    };
  }
}
