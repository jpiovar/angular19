import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { RecordsLoad } from '../state/records/records.actions';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { StartSpinner, StopSpinner } from '../state/spinner/spinner.actions';
import { ButtonModule } from 'carbon-components-angular';

@Component({
  selector: 'app-about',
  imports: [ButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  
  constructor(
    private store: Store<AppState>
  ) {

    this.subscription.add(
      this.store.select('records')
        // .pipe(last())
        .subscribe((res: any) => {
           debugger;
          if (res && res.data) {
            debugger;
            console.log('resords data:', res.data);
          }
        })
    );

  }
  
  ngOnInit(): void {
    debugger;
    console.log('AboutComponent initialized');
    const url = environment.apiUrl;
    this.store.dispatch(RecordsLoad(url));
  }

  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }


  spinnerClick(action: string) {
    if (action === 'start') { 
      this.store.dispatch(StartSpinner());
    } else if(action === 'stop') {
      this.store.dispatch(StopSpinner());
    }
  }







}
