import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsivenessService {
  public darkMode = toSignal(inject(AppStateService).weatherData$.pipe(map((data) => !data.current.is_day)));

  public isMobile = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(map(({ matches }) => matches))
  );

  unitSystem = signal<'metric' | 'imperial'>('metric');

  toggleUnitSystem() {
    this.unitSystem.update((val) => (val === 'metric' ? 'imperial' : 'metric'));
  }
}
