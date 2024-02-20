import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Notification, NotificationsService } from "../../services/notifications/notifications.service";
import { Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { NotificationComponent } from "../../partials/notification/notification.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NotificationComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  notification$: Observable<Notification | null>;

  constructor(private notifications: NotificationsService) {
    this.notification$ = this.notifications.notification$;
  }
}
