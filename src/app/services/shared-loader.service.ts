import { Injectable } from '@angular/core';
import * as fromApp from '../ngrx/app.reducer';
import * as Loader from '../ngrx/actions/loader.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SharedLoaderService {
  static readonly FULL = 'full';

  constructor(private store: Store<fromApp.State>) {}

  showFullLoader(message?: string): void {
    this.store.dispatch(
      new Loader.StartLoader({
        type: SharedLoaderService.FULL,
        message: message,
      })
    );
  }

  dismissLoader(): void {
    this.store.dispatch(new Loader.StopLoader());
  }
}
