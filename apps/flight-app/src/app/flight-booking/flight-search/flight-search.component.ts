import { Component, OnInit } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFlightBooking from '../+state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']/* ,
  providers : [
    { provide: FlightService, useFactory: () => {}, deps: [Store] }
  ] */
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$: Observable<Flight[]>;

  // "shopping basket" with selected flights
  basket: object = {
    3: true,
    5: true
  };

  constructor(private store: Store<fromFlightBooking.FeatureAppState>) {}

  ngOnInit() {
    this.flights$ = this.store.pipe(
      // select(state => state.flightBooking.flights)
      select(fromFlightBooking.selectFlights)
    );
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(
      fromFlightBooking.flightsLoad({
        from: this.from,
        to: this.to
      })
    );
  }

  delay(flight: Flight): void {
    this.store.dispatch(
      fromFlightBooking.flightUpdate({ flight: {
        ...flight,
        date: addMinutesToDate(flight.date, 15).toISOString()
      }})
    );
  }
}

export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
  let dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};
