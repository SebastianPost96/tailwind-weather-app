import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import env from '../../../env';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

interface WeatherByIp {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  is_eu: string;
  geoname_id: number;
  city: string;
  region: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

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

  getWeatherByIp(): Observable<WeatherByIp> {
    return of({
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
    }).pipe(delay(1000));

    const params = new HttpParams().append('q', 'auto:ip');

    return this.http.get<WeatherByIp>(`${this.url}/ip.json`, {
      headers: this.headers,
      params,
    });
  }

  getWeatherByLocation({
    coords,
  }: GeolocationPosition): Observable<WeatherData> {
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
    }).pipe(delay(1000));

    const coordinates = [coords.latitude, coords.longitude].toString();
    const params = new HttpParams().append('q', coordinates);

    return this.http.get<WeatherData>(`${this.url}/current.json`, {
      headers: this.headers,
      params,
    });
  }
}
