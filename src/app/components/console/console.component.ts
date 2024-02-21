import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ConsoleService } from "../../services/console/console.service";
import { Observable, tap } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MarkdownModule
  ],
  providers: [],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent {
  snippet$: Observable<string | null>;

  constructor(
    private console: ConsoleService,
    private cdr: ChangeDetectorRef,
  ) {
    this.snippet$ = this.console.console.pipe(
      // FIXME: This is a workaround for the ngx-markdown copy button rendering issue
      tap(() => setTimeout(() => this.cdr.markForCheck(), 100))
    );
  }

  clearConsole(): void {
    this.console.clearLog();
  }
}
