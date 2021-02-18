import {Component, OnInit} from '@angular/core';
import {FakeFlightService, Flight, FlightService} from '@flight-workspace/flight-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromFlightBooking from '../+state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$: Observable<Flight[]>;

  /* get flights() {
    return this.flightService.flights;
  } */

  // "shopping basket" with selected flights
  basket: object = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.FeatureAppState>) {
  }

  ngOnInit() {
    this.flights$ = this.store.pipe(select(state => state.flightBooking.flights));
  }

  search(): void {
    if (!this.from || !this.to) return;

    /* this.flightService
      .load(this.from, this.to, this.urgent); */

    this.flightService.find(this.from, this.to)
      .subscribe(flights =>
        this.store.dispatch(
          fromFlightBooking.flightsLoaded({ flights })
        )
      );
  }

  delay(): void {
    // this.flightService.delay();

    this.flights$.pipe(take(1))
      .subscribe(flights => {
        const oldFlight = flights[0];

        this.store.dispatch(
          fromFlightBooking.flightUpdate({ flight: {
            ...oldFlight,
            date: addMinutesToDate(oldFlight.date, 15).toISOString()
          }})
        );
      });
  }

}

export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
  let dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};
