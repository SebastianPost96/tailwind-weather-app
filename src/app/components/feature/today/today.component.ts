import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppStateService } from '../../../services/app-state.service';
import { LocalLinkPipe } from '../../../pipes/local-link.pipe';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LocalLinkPipe],
  templateUrl: './today.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayComponent {
  unitSystem = signal<'metric' | 'imperial'>('metric');
  now = new Date();

  constructor(public stateService: AppStateService) {}

  toggleUnitSystem() {
    this.unitSystem.update((val) => (val === 'metric' ? 'imperial' : 'metric'));
  }
}
