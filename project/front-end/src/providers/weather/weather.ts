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
  appCode = 'APPCODE 706230690157445ca0be933947c0e1f1';
  url = 'http://saweather.market.alicloudapi.com/area-to-weather';

  getWeather(city) {
    return this.http.get(this.url, {
      headers: new HttpHeaders().set('Authorization', this.appCode),
      params: {
        'area': city,
        'need3HourForcast': '0',
        'needAlarm': '0',
        'needHourData': '0',
        'needIndex': '0',
        'needMoreDay': '0'
      }
    });
  }
  constructor(public http: HttpClient) {

  }
}
