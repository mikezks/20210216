import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  selectFlightBookingState,
  (state) => state.flights
);

export const selectPassengers = createSelector(
  selectFlightBookingState,
  (state) => state.flights
);

export const selectBookings = createSelector(
  selectFlightBookingState,
  (state) => state.flights
);

export const selectActiveUser = createSelector(
  selectFlightBookingState,
  (state) => state.flights
);

export const selectActiveUsersFlights = createSelector(
  // Selectors
  selectFlights,
  selectPassengers,
  selectBookings,
  selectActiveUser,
  // Projector
  (flights, passengers, bookings, activeUser) => {
    // Object & Array processing
    return {
      username: 'michaelzikes',
      firstname: 'Michael',
      lastname: 'Zikes',
      flights: [
        {
          id: 999,
          from: 'London',
          to: 'Barcelona'
        }
      ]
    };
  }
);
