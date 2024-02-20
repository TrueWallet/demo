import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ConsoleService } from "../../services/console/console.service";

@Component({
  selector: 'app-info-trigger',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './info-trigger.component.html',
  styleUrl: './info-trigger.component.scss'
})
export class InfoTriggerComponent {
  @Input() snippet: string | null = null;

  constructor(private console: ConsoleService,) {
  }

  showCode() {
    if (!this.snippet) {
      return;
    }

    this.console.setLog(this.snippet);
  }
}
