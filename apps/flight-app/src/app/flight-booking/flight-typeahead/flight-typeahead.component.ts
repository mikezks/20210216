import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable, Subscription, timer } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, share, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) {
    //this.rxjsDemo();
  }

  ngOnInit(): void {
    this.flights$ =
      this.control.valueChanges.pipe(
        filter(value => value.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        tap(_ => this.loading = true),
        delay(500),
        switchMap(city => this.load(city)),
        tap(_ => this.loading = false),
      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 1000).pipe(
      tap(v => console.log('log from observable', v)),
      share()
    );

    this.subscription = this.timer$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
