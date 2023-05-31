import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() label = '';
  @ViewChild('template', { static: true }) template!: TemplateRef<unknown>;
}
