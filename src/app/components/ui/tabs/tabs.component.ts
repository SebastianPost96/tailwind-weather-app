import { ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2 border-b border-current">
      <div *ngFor="let tab of tabs" class="rounded-t bg-red-500 px-2 py-0.5 ">
        <ng-container [ngComponentOutlet]="TabComponent" [ngComponentOutletContent]="[[tab.elem.nativeElement]]"></ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  TabComponent = TabComponent;
}
