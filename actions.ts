flightsLoad({
  flights: [
    {
      id: 999,
      from: 'London',
      to: 'Barcelona'
    }
  ]
})

setFlights(flights: Flight[]): void {

}

{
  type: '[FlightBooking] Flights loaded',
  flights: [
    {
      id: 999,
      from: 'London',
      to: 'Barcelona'
    }
  ]
}
