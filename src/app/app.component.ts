import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { AppStateService } from './services/app-state.service';
import { ResponsivenessService } from './services/responsiveness.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class.dark')
  get darkMode() {
    return this.responsive.darkMode();
  }

  constructor(
    public appState: AppStateService,
    public responsive: ResponsivenessService
  ) {}
}
