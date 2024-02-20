import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-operation-header',
  standalone: true,
  imports: [],
  templateUrl: './operation-header.component.html',
  styleUrl: './operation-header.component.scss'
})
export class OperationHeaderComponent {
  constructor(private location: Location) {
  }

  close(): void {
    this.location.back();
  }
}
