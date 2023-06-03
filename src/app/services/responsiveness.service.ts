import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsivenessService {
  private _darkMode = signal(inject(MediaMatcher).matchMedia('(prefers-color-scheme: dark)').matches);
  public darkMode = this._darkMode.asReadonly();

  public isMobile = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(map(({ matches }) => matches))
  );

  unitSystem = signal<'metric' | 'imperial'>('metric');

  toggleDarkMode() {
    this._darkMode.update((dark) => !dark);
  }

  toggleUnitSystem() {
    this.unitSystem.update((val) => (val === 'metric' ? 'imperial' : 'metric'));
  }
}
