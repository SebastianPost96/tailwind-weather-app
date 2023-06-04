import {inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {delay, map} from 'rxjs';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {AppStateService} from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsivenessService {
  public darkMode = toSignal(inject(AppStateService).weatherData$.pipe(map((data) => !data.current.is_day)));
  public isMobile = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(map(({matches}) => matches))
  );
  private _unitSystem = signal<'metric' | 'imperial'>('metric');
  public unitSystem = this._unitSystem.asReadonly()


  constructor() {
    this._syncMobileHeaderColor();
  }

  public toggleUnitSystem() {
    this._unitSystem.update((val) => (val === 'metric' ? 'imperial' : 'metric'));
  }

  private _syncMobileHeaderColor() {
    toObservable(this.darkMode)
      .pipe(takeUntilDestroyed(), delay(0))
      .subscribe(() => {
        const toolbar = document.getElementById('body-bg');
        const headerElem = document.getElementById('theme-color');

        if (toolbar && headerElem) {
          const color = getComputedStyle(toolbar).backgroundColor;
          headerElem.setAttribute('content', color);
        }
      });
  }
}


