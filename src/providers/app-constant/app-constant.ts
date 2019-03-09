import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConstantProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AppConstantProvider Provider');
  }

  API = {
    API_ENDPOINT: 'http://media.mw.metropolia.fi/wbma',
    MEDIA_ENDPOINT: 'http://media.mw.metropolia.fi/wbma/upload',
  };

  CATEGORY = [
    'SPORT',
    'Food',
    'TECHNOLOGY'
  ];

}
