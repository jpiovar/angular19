import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, flatMap, mergeMap, delay, exhaustMap } from 'rxjs/operators';
import { forkJoin, Observable, Observer, of, throwError, zip } from 'rxjs';

import {
  RECORDS_LOAD,
  RecordsLoad,
  RecordsLoadSuccess,
  RecordsLoadFail,

} from './records.actions';

import { RecordsState } from './records.models';
import { environment } from '../../../environments/environment';
import { ajax } from 'rxjs/ajax';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AppState } from '..';
import { RecordService } from '../../services/record.service';

@Injectable()
export class RecordsEffects {

  origin: string;

  recordsLoad$: any;

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private recordService: RecordService
  ) {
    debugger;
    this.origin = environment.apiUrl;

    this.recordsLoad$ = createEffect(() => {
      return this.actions$?.pipe(
        ofType(RECORDS_LOAD),
        // exhaustMap(() => this.httpClient.get(`${this.origin}`)
        exhaustMap(() => this.recordService.getAll(this.origin)
            .pipe(
              // mergeMap((res) => {
              //   const raArr = res.map((item: any) => {
              //     return item.registeredAddress.ruianCode;
              //   });
              //   const uniqueRaArr = [...new Set(raArr)];
              //   const objRaArr = uniqueRaArr.map((item: any) => {
              //     return { ruianCode: item };
              //   });
              //   // debugger;
              //   const req: any = {
              //     where: {
              //       // or: [{"ruianCode": "20670958"}, {"ruianCode": "20670966"}]
              //       or: objRaArr
              //     }
              //   };
              //   const uri = encodeURIComponent(JSON.stringify(req));
              //   const url = `${ruianAddresses}?filter=${uri}`;
              //   // return forkJoin(raArr);
              //   // return zip(...raArr);
              //   return ajax.getJSON(url);
              // }),
              map(
                (response: any) => {
                  debugger;
                  return RecordsLoadSuccess(response);
                }
              ),
              catchError(error => {
                debugger;
                return of(RecordsLoadFail(error));
              })
            )
          )
        )
      });
  }

  // private actions$ = inject(Actions);
  // private recordService = inject(RecordService);


        

}


// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators'; // Import necessary operators
// import { of } from 'rxjs'; // Import 'of'
// import * as RecordsActions from './records.actions'; // Use * as best practice
// // import { RecordsService } from './records.service'; // Your service
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

// @Injectable()
// export class RecordsEffects {
//   constructor(
//     private actions$: Actions, // Correctly inject Actions
//     private httpClient: HttpClient // Inject your service
//   ) {}

//   recordsLoad$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(RecordsActions.RECORDS_LOAD),
//       exhaustMap(() => this.httpClient.get(environment.apiUrl).pipe(
//         map((response: any) => RecordsActions.RecordsLoadSuccess(response)), // Correctly dispatch success action, use the interface for type safety
//         catchError(error => of(RecordsActions.RecordsLoadFail({ error }))) // Correctly dispatch fail action, use the interface for type safety
//       ))
//     );
//   });
// }