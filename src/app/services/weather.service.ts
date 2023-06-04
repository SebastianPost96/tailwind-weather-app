import {Injectable, signal} from '@angular/core';
import {catchError, defer, finalize, MonoTypeOperatorFunction, Observable, of, switchMap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import env from '../../../env';
import {WeatherData} from '../models/weather-data.model';
import {WeatherByIp} from '../models/weather-by-ip.model';
import {weatherDataMock} from '../models/mocks/weather-data.mock';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly _url = 'https://weatherapi-com.p.rapidapi.com';
  private readonly _headers = new HttpHeaders({
    'X-RapidAPI-Key': env.rapidApiKey,
    'X-RapidAPI-Host': env.rapidApiHost,
  });

  private _activeRequests = signal(0)
  public activeRequests = this._activeRequests.asReadonly()

  constructor(private _http: HttpClient) {
  }


  public getWeatherByIp(): Observable<WeatherData> {
    const params = new HttpParams().append('q', 'auto:ip');
    const request$ = this._http.get<WeatherByIp>(`${this._url}/ip.json`, {
      headers: this._headers,
      params,
    });

    return request$.pipe(
      switchMap(({lat, lon}) => {
        return this.getWeatherByLocation(lat, lon);
      }),
      catchError(() => of(weatherDataMock)),
      this._withLoadingScreen()
    );
  }

  public getWeatherByLocation(lat: number, lon: number): Observable<WeatherData> {
    const coordinates = [lat, lon].toString();
    const params = new HttpParams().append('q', coordinates);

    return this._http
      .get<WeatherData>(`${this._url}/current.json`, {
        headers: this._headers,
        params,
      })
      .pipe(catchError(() => of(weatherDataMock)), this._withLoadingScreen());
  }


  private _withLoadingScreen<T>(): MonoTypeOperatorFunction<T> {
    return o => defer(() => {
      this._activeRequests.update(active => active + 1)
      return o;
    }).pipe(finalize(() => {
      this._activeRequests.update(active => active - 1)
    }))
  }
}
