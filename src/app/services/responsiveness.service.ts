import { inject, Injectable, signal } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ResponsivenessService {
  private _darkMode = signal(
    inject(MediaMatcher).matchMedia('(prefers-color-scheme: dark)').matches
  );
  public darkMode = this._darkMode.asReadonly();

  toggleDarkMode() {
    this._darkMode.update((dark) => !dark);
  }
}
