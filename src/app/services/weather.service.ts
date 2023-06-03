import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import env from '../../../env';
import { WeatherData } from '../models/weather-data.model';
import { WeatherByIp } from '../models/weather-by-ip.model';
import { weatherByIpMock } from '../models/mocks/weather-by-ip.mock';
import { weatherDataMock } from '../models/mocks/weather-data.mock';

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
    const request$ = of<WeatherByIp>(weatherByIpMock).pipe(delay(300));

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
    return of(weatherDataMock).pipe(delay(300));

    const coordinates = [lat, lon].toString();
    const params = new HttpParams().append('q', coordinates);

    return this.http.get<WeatherData>(`${this.url}/current.json`, {
      headers: this.headers,
      params,
    });
  }
}
