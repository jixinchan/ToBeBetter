import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  //使用阿里云天气服务的API706230690157445ca0be933947c0e1f0
  appCode = 'APPCODE 706230690157445ca0be933947c0e1f0';
  url = 'http://saweather.market.alicloudapi.com/gps-to-weather';

  getWeather(lat,lng) {
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', this.appCode),
      params: {
        'from':'3',
        'lat':lat,
        'lng':lng,
        'needIndex':'1',
        'needMoreDay':'0'
      }
    });
  }
  constructor(public http: HttpClient) {

  }
}
