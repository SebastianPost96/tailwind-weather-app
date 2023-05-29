import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    const params = new HttpParams().append('q', 'auto:ip');

    return this.http.get<WeatherByIp>(`${this.url}/ip.json`, {
      headers: this.headers,
      params,
    });
  }

  getWeatherByLocation({
    coords,
  }: GeolocationPosition): Observable<WeatherData> {
    const coordinates = [coords.latitude, coords.longitude].toString();
    const params = new HttpParams().append('q', coordinates);

    return this.http.get<WeatherData>(`${this.url}/current.json`, {
      headers: this.headers,
      params,
    });
  }
}
