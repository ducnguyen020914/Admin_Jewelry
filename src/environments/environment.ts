// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: true,
  domain: 'http://localhost:4200',
  // gateway: 'http://192.168.2.100:8801',
  gateway: 'http://localhost:8080',
  qrCode: 'http://localhost:4200/#/home',
  androidDownloadUrl:
    'https://play.google.com/store/apps/details?id=com.mbamc.buildingcares',
  iosDownloadUrl: 'https://apps.apple.com/us/app/building-cares/id1602344331',
  firebaseConfig:{
    apiKey: "AIzaSyAcjJU8RN9lLXJ5aOOwy_t2PhulUAJnNQY",
    authDomain: "datn-18e39.firebaseapp.com",
    dowloadURL: 'https://datn-18e39-default-rtdb.firebaseio.com/',
    projectId: "datn-18e39",
    storageBucket: "datn-18e39.appspot.com",
    messagingSenderId: "1029700630375",
    appId: "1:1029700630375:web:83405552add603d52ee1c2",
    measurementId: "G-MJX4SG3C03"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
