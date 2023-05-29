import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public appState: AppStateService) {}

  allowGps() {
    navigator.geolocation.getCurrentPosition(() => {});
  }
}
