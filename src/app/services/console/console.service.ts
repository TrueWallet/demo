import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private _console: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  get console(): Observable<string | null> {
    return this._console.asObservable();
  }
  constructor() { }

  setLog(log: string) {
    this._console.next(log);
  }

  clearLog() {
    this._console.next(null);
  }

}
