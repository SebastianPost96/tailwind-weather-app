import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  from,
  map,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private weatherService: WeatherService) {}

  geoLocatorPermission$: Observable<PermissionStatus> = new Observable(
    (subscriber) => {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permission) => {
          subscriber.next(permission);

          permission.onchange = () => {
            subscriber.next(permission);
          };
        });
    }
  );

  weatherData$ = this.geoLocatorPermission$.pipe(
    distinctUntilChanged((previous, current) => {
      return current.state === 'denied';
    }),
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
          ).pipe(
            switchMap((position) =>
              this.weatherService.getWeatherByLocation(position)
            )
          );
      }
    }),
    map((data) => ({
      city: 'location' in data ? data.location.name : data.city,
    })),
    shareReplay(0)
  );
}
