import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [style.width]="width" class="rounded-lg border border-panel-border bg-panel-bg p-4 shadow shadow-panel-border">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input() width?: string;
}
