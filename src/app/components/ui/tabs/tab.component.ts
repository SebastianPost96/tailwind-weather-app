import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  constructor(public elem: ElementRef<TabComponent>) {}
}
