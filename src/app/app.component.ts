import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { AppStateService } from './services/app-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public appState: AppStateService, private cd: ChangeDetectorRef) {
    this.appState.weatherData$.pipe(takeUntilDestroyed()).subscribe(() => {
      queueMicrotask(() => this.cd.detectChanges());
    });
    this.appState.geoLocatorPermission$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        queueMicrotask(() => this.cd.detectChanges());
      });
  }

  allowGps() {
    navigator.geolocation.getCurrentPosition(() => {});
  }
}
