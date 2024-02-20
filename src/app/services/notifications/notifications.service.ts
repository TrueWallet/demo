import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";

export interface Notification {
  type: 'success' | 'warning';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _notification$$: BehaviorSubject<Notification | null> = new BehaviorSubject<Notification | null>(null);

  get notification$(): Observable<Notification | null> {
    return this._notification$$.asObservable();
  }

  constructor() {}

  success(data: {title: string, message: string}): void {
    of(true).pipe(
      tap(() => this._notification$$.next({type: 'success', ...data})),
      delay(5000),
    ).subscribe(() => this._notification$$.next(null))
  }

  warning(data: {title: string, message: string}): void {
    of(true).pipe(
      tap(() => this._notification$$.next({type: 'warning', ...data})),
      delay(5000),
    ).subscribe(() => this._notification$$.next(null))
  }
}
