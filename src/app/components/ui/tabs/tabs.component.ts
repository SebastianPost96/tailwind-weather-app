import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <div
        *ngFor="let tab of tabs; let i = index"
        (click)="selectedTab.set(i)"
        [class.selected]="selectedTab() === i"
        class="cursor-pointer rounded-t
        px-2 py-0.5
        shadow-inner shadow-panel-border
        outline-panel-border hover:bg-slate-100 active:outline
        hover:dark:bg-slate-700
        [&.selected]:bg-slate-50
        [&.selected]:outline [&.selected]:dark:bg-slate-800"
      >
        {{ tab.label }}
      </div>
    </div>
    <div *ngIf="tabs.get(selectedTab()) as tab">
      <ng-container [ngTemplateOutlet]="tab.template"></ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  selectedTab = signal(0);
}
