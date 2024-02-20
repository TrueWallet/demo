import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase } from "@angular/common";

export type NotificationType = 'success'| 'warning';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgClass
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() type: NotificationType = 'success';
  @Input() title: string = '';
  @Input() message: string = '';

  constructor() {}
}
