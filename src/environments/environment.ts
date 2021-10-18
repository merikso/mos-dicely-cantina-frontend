// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  cdUrl: 'https://deckofcardsapi.com/api/deck/',
  bkndUrlDeployed: 'http://mosdicelybackend-env.eba-cpytmwf2.us-east-2.elasticbeanstalk.com',
  bkndUrlLocal: 'localhost:5000/',
  production: false,
};

export const localUrl = `http://localhost:5000`
export const awsUrl = `http://mosdicelybackend-env.eba-cpytmwf2.us-east-2.elasticbeanstalk.com`

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
