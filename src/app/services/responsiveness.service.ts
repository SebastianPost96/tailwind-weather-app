import {computed, inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {defer, finalize, map, MonoTypeOperatorFunction} from 'rxjs';
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

  unitSystem = signal<'metric' | 'imperial'>('metric');

  public static activeRequests = signal(0)
  public static isLoading = computed(() => !!ResponsivenessService.activeRequests())
  public isLoading = ResponsivenessService.isLoading


  constructor() {
    this.syncMobileHeaderColor();
  }

  toggleUnitSystem() {
    this.unitSystem.update((val) => (val === 'metric' ? 'imperial' : 'metric'));
  }

  private syncMobileHeaderColor() {
    toObservable(this.darkMode)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        queueMicrotask(() => {
          const toolbar = document.getElementById('body-bg');
          const headerElem = document.getElementById('theme-color');

          if (toolbar && headerElem) {
            const color = getComputedStyle(toolbar).backgroundColor;
            headerElem.setAttribute('content', color);
          }
        });
      });
  }
}

export function withLoadingScreen<T>(): MonoTypeOperatorFunction<T> {
  return o => defer(() => {
    ResponsivenessService.activeRequests.update(active => active + 1)
    return o;
  }).pipe(finalize(() => {
    ResponsivenessService.activeRequests.update(active => active - 1)
  }))
}
