import { Injectable, NgZone } from '@angular/core';
import { distinctUntilChanged, from, Observable, shareReplay, switchMap } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private weatherService: WeatherService, private zone: NgZone) {}

  geoLocatorPermission$: Observable<PermissionStatus> = new Observable((subscriber) => {
    navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
      subscriber.next(permission);

      permission.onchange = () => {
        this.zone.run(() => {
          subscriber.next(permission);
        });
      };
    });
  });

  weatherData$ = this.geoLocatorPermission$.pipe(
    distinctUntilChanged((previous, current) => current.state === 'denied'),
    switchMap((permission) => {
      switch (permission.state) {
        case 'denied':
        case 'prompt':
          return this.weatherService.getWeatherByIp();
        case 'granted':
          return from(
            new Promise<GeolocationPosition>((resolve) => {
              navigator.geolocation.getCurrentPosition(resolve);
            })
          ).pipe(switchMap(({ coords }) => this.weatherService.getWeatherByLocation(coords.latitude, coords.longitude)));
      }
    }),
    shareReplay(0)
  );
}
