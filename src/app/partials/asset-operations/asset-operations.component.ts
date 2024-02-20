import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LowerCasePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { AssetOperation } from "../../constants/asset-operation";
import { Asset } from "../../interfaces/asset";
import { RouterLink } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

export interface Operation {
  url: string | null;
  enabled: boolean;
  operation: AssetOperation;
}

@Component({
  selector: 'app-asset-operations',
  standalone: true,
  imports: [
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    RouterLink,
    LowerCasePipe,
    NgIf,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './asset-operations.component.html',
  styleUrl: './asset-operations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetOperationsComponent {
  @Input() view: 'wide' | 'centered' = 'centered';
  @Input() set asset(value: Asset) {
    if (value) {
      this.token = value;
      this.operations = this.setOperations(value.operations);
    }
  };
  @Input() loading: boolean = false;

  @Output() operation: EventEmitter<AssetOperation> = new EventEmitter<AssetOperation>();
  @Output() processed: EventEmitter<void> = new EventEmitter<void>();

  token!: Asset;
  operations: Operation[];
  protected readonly AssetOperation = AssetOperation;

  constructor() {
    this.operations = this.setOperations(Object.values(AssetOperation));
  }

  private setOperations(operations: string[]): Operation[] {
    return operations.map((operation: string) => ({
      operation: operation as AssetOperation,
      url: this.getOperationUrl(operation as AssetOperation),
      enabled: [AssetOperation.send, AssetOperation.receive, AssetOperation.deposit].includes(operation as AssetOperation),
    }));
  }

  private getOperationUrl(operation: AssetOperation): string | null {
    switch (operation) {
      case AssetOperation.send:
      case AssetOperation.receive:
        return `/${operation.toLowerCase()}${this.token ? `/${this.token.symbol}` : ''}`;
      case AssetOperation.deposit:
        return this.token ? null : `https://faucet.polygon.technology/`;
      default:
        return null;
    }
  }

  emitEvent(operation: AssetOperation): void {
    this.operation.emit(operation);
  }
}
