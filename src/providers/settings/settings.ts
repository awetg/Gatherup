import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<string>
  constructor() {
    this.theme = new BehaviorSubject('dark-theme');
  }
  //inform everyone subscribe to the subject
  setActiveTheme(val){
    this.theme.next(val);
  }
  getActiveTheme(){
    return this.theme.asObservable();
  }

}
