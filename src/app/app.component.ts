import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ConsoleComponent } from "./components/console/console.component";
import { WalletHeaderComponent } from "./partials/wallet-header/wallet-header.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ConsoleService } from "./services/console/console.service";
import { filter } from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsoleComponent, WalletHeaderComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _console: ConsoleService,
  ) {}

  ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const data = this.getRouteData(this.route);

      if (data.snippet) {
        this._console.setLog(data.snippet);
      } else {
        this._console.clearLog();
      }
    });
  }

  private getRouteData(route: ActivatedRoute): { snippet?: string } {
    let data = route.snapshot.data;
    let child = route.firstChild;
    while (child) {
      data = { ...data, ...child.snapshot.data };
      child = child.firstChild;
    }

    return data;
  }
}
