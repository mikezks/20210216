import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoad = createAction(
  '[FlightBooking] Flights load FlightSearch',
  props<{ from: string, to: string }>()
);

export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{ flights: Flight[] }>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Flight update',
  props<{ flight: Flight }>()
);

/* export const loadFlightBookingsSuccess = createAction(
  '[FlightBooking] Load FlightBookings Success',
  props<{ data: any }>()
);

export const loadFlightBookingsFailure = createAction(
  '[FlightBooking] Load FlightBookings Failure',
  props<{ error: any }>()
); */
