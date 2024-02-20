import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsoleComponent } from "./components/console/console.component";
import { WalletHeaderComponent } from "./partials/wallet-header/wallet-header.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsoleComponent, WalletHeaderComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
