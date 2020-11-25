import { NgZone } from "@angular/core";
import {
  MonoTypeOperatorFunction,
  Operator,
  Subscriber,
  Observable,
  TeardownLogic,
  Observer
} from "rxjs";
import { map } from "rxjs/operators";

class ZonefreeOperator<T> implements Operator<T, T> {
  constructor(private readonly zone: NgZone) {}

  call(observer: Observer<T>, source: Observable<T>): TeardownLogic {
    return this.zone.runOutsideAngular(() => source.subscribe(observer));
  }
}

export function zonefull<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return map(value => zone.run(() => value));
}

export function zonefree<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return source => source.lift(new ZonefreeOperator(zone));
}

// -- -- -- -- -- --

import { Component, DoCheck, Inject, NgZone } from "@angular/core";
import { interval } from "rxjs";
import { filter } from "rxjs/operators";

import { zonefree, zonefull } from "./zone.operators";

const POLLING_TIME = 100;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements DoCheck {
  ticks = 0;

  constructor(@Inject(NgZone) zone: NgZone) {
    interval(POLLING_TIME)
      .pipe(
        zonefree(zone), // Leaving NgZone
        filter((_, index) => !(index % 10)), // Filtering stream
        // Re-entering zone if stream reached here
        zonefull(zone), 
      )
      .subscribe(() => {
        this.ticks += 1;
      });
  }

  ngDoCheck() {
    console.log("App tick");
  }
}
