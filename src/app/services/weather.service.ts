import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import env from '../../../env';
import { WeatherData } from '../models/weather-data.model';
import { WeatherByIp } from '../models/weather-by-ip.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly url = 'https://weatherapi-com.p.rapidapi.com';
  private readonly headers = new HttpHeaders({
    'X-RapidAPI-Key': env.rapidApiKey,
    'X-RapidAPI-Host': env.rapidApiHost,
  });

  constructor(private http: HttpClient) {}

  getWeatherByIp(): Observable<WeatherData> {
    const request$ = of<WeatherByIp>({
      ip: '18.197.117.10',
      type: 'ipv4',
      continent_code: 'EU',
      continent_name: 'Europe',
      country_code: 'DE',
      country_name: 'Germany',
      is_eu: 'true',
      geoname_id: 2925533,
      city: 'Frankfurt am Main',
      region: '',
      lat: 50.1109,
      lon: 8.68213,
      tz_id: 'Europe/Berlin',
      localtime_epoch: 1685465004,
      localtime: '2023-05-30 18:43',
    }).pipe(delay(300));

    // const params = new HttpParams().append('q', 'auto:ip');
    // const request$ = this.http.get<WeatherByIp>(`${this.url}/ip.json`, {
    //   headers: this.headers,
    //   params,
    // });

    return request$.pipe(
      switchMap(({ lat, lon }) => {
        return this.getWeatherByLocation(lat, lon);
      })
    );
  }

  getWeatherByLocation(lat: number, lon: number): Observable<WeatherData> {
    return of({
      location: {
        name: 'Schweinfurt',
        region: 'Bayern',
        country: 'Germany',
        lat: 50.06,
        lon: 10.24,
        tz_id: 'Europe/Berlin',
        localtime_epoch: 1685464967,
        localtime: '2023-05-30 18:42',
      },
      current: {
        last_updated_epoch: 1685464200,
        last_updated: '2023-05-30 18:30',
        temp_c: 18.6,
        temp_f: 65.5,
        is_day: 1,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          code: 1000,
        },
        wind_mph: 11.6,
        wind_kph: 18.7,
        wind_degree: 47,
        wind_dir: 'NE',
        pressure_mb: 1021,
        pressure_in: 30.15,
        precip_mm: 0,
        precip_in: 0,
        humidity: 48,
        cloud: 6,
        feelslike_c: 18.6,
        feelslike_f: 65.5,
        vis_km: 10,
        vis_miles: 6,
        uv: 5,
        gust_mph: 15.7,
        gust_kph: 25.2,
      },
    }).pipe(delay(300));

    const coordinates = [lat, lon].toString();
    const params = new HttpParams().append('q', coordinates);

    return this.http.get<WeatherData>(`${this.url}/current.json`, {
      headers: this.headers,
      params,
    });
  }
}
