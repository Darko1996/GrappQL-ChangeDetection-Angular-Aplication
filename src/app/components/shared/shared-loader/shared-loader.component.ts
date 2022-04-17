import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SharedLoaderService } from '../../../services/shared-loader.service';
import { Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../ngrx/app.reducer';

@Component({
  selector: 'app-shared-loader',
  templateUrl: './shared-loader.component.html',
  styleUrls: ['./shared-loader.component.scss'],
})
export class SharedLoaderComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  private clickHandler: any = this.preventClick.bind(this);

  showFull = false;
  mainText: string;

  constructor(
    private loaderService: SharedLoaderService,
    private renderer: Renderer2,
    private store: Store<fromApp.State>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.store
      .select(fromApp.getLoaderState)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: any) => {
        this.showFull = value?.loader?.type === SharedLoaderService.FULL;
      });
  }

  ngOnInit() {}

  preventClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  enableClick(): void {
    this.document.removeEventListener('click', this.clickHandler, true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
    this.enableClick();
  }

  closeLoader(): void {
    this.loaderService.dismissLoader();
  }
}
