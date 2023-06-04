import {computed, Injectable, NgZone} from '@angular/core';
import {distinctUntilChanged, from, Observable, shareReplay, switchMap} from 'rxjs';
import {WeatherService} from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private _weatherService: WeatherService, private _zone: NgZone) {
  }

  public isLoading = computed(() => !!this._weatherService.activeRequests());

  public geoLocatorPermission$ = new Observable<PermissionStatus>((subscriber) => {
    navigator.permissions.query({name: 'geolocation'}).then((permission) => {
      subscriber.next(permission);

      permission.onchange = () => {
        this._zone.run(() => {
          subscriber.next(permission);
        });
      };
    });
  }).pipe(shareReplay(0));

  public weatherData$ = this.geoLocatorPermission$.pipe(
    distinctUntilChanged((previous, current) => current.state === 'denied'),
    switchMap((permission) => {
      switch (permission.state) {
        case 'denied':
        case 'prompt':
          return this._weatherService.getWeatherByIp();
        case 'granted':
          return from(
            new Promise<GeolocationPosition>((resolve) => {
              navigator.geolocation.getCurrentPosition(resolve);
            })
          ).pipe(switchMap(({coords}) => this._weatherService.getWeatherByLocation(coords.latitude, coords.longitude)));
      }
    }),
    shareReplay(0)
  );
}
