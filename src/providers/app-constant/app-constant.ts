/*
  Generated class for the AppConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// @Injectable()
export class AppConstantProvider {

  API = {
    API_ENDPOINT: 'http://media.mw.metropolia.fi/wbma',
    MEDIA_ENDPOINT: 'http://media.mw.metropolia.fi/wbma/uploads',
  };

  CATEGORY = [
    'SPORT',
    'FOOD',
    'TECHNOLOGY'
  ];

  APP = {
    EVENT_TAG: 'EVENT',
    AVATAR_TAG: 'GATHERUP_AVATAR',
    AVATAR_TITLE: 'GATHERUP_AVATAR_TITLE',
    APP_INFO_TAG: 'GATHERUP_APP_INFO',
    APP_INFO_TITLE: 'GATHERUP_APP_INFO_FILE',
    USER_INFO_TITLE: 'GATHERUP_USER_INFO_FILE',
    APP_INFO_MEDIA_ID: 985
  };

  constructor() {
    console.log('Hello AppConstantProvider Provider');
  }

}
