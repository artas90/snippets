import { InjectionToken, inject } from "@angular/core";
// https://github.com/ng-web-apis/common
import { PAGE_VISIBILITY, LOCAL_STORAGE } from "@ng-web-apis/common";
import { FormControl } from "@angular/forms";
import { switchMap, tap, filter, map } from "rxjs/operators";

const DATA_KEY = "data";

export const SYNCHRONIZER_FACTORY = new InjectionToken(
  "A stream that syncs control data between tabs",
  {
    factory: () => {
      const pageVisibility$ = inject(PAGE_VISIBILITY);
      const localStorage = inject(LOCAL_STORAGE);

      return (accessor: () => string) =>
        pageVisibility$.pipe(
          tap(visible => {
            if (!visible) {
              localStorage.setItem(DATA_KEY, accessor());
            }
          }),
          filter(visible => visible),
          map(() => localStorage.getItem(DATA_KEY))
        );
    }
  }
);

// -- -- -- --

import { Component, Inject } from '@angular/core';
import { SYNCHRONIZER_FACTORY } from './synchronizer';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.less' ]
})
export class AppComponent {
  readonly control = new FormControl('');

  constructor(
    @Inject(SYNCHRONIZER_FACTORY)
    synchronizerFactory: (accessor: () => string) => Observable<string>
  ) {
    const synchronizer = synchronizerFactory(() => this.control.value || '');

    synchronizer.subscribe(value => {
      this.control.setValue(value);
    })
  }
}
