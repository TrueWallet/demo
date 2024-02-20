import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConsoleService } from "../../services/console/console.service";
import { Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { HIGHLIGHT_OPTIONS, HighlightModule } from "ngx-highlightjs";

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HighlightModule,
  ],
  providers: [],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsoleComponent {
  snippet$: Observable<string | null>;

  constructor(private console: ConsoleService) {
    this.snippet$ = this.console.console;
  }

  clearConsole(): void {
    this.console.clearLog();
  }
}
