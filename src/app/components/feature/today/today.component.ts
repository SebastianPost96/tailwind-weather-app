import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppStateService } from '../../../services/app-state.service';
import { LocalLinkPipe } from '../../../pipes/local-link.pipe';
import { ResponsivenessService } from '../../../services/responsiveness.service';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LocalLinkPipe],
  templateUrl: './today.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayComponent {
  constructor(public stateService: AppStateService, public responsive: ResponsivenessService) {}
}
