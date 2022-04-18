import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, finalize, Subject, takeUntil } from 'rxjs';
import { DetailBoxService } from '../../services/detail-box.service';
import { BoxDetails, BoxResponse } from '../../models/Box';
import { ToastrService } from 'ngx-toastr';
import { slideIn } from '../../animations';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn],
})
export class DetailBoxComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();
  isClicked: boolean;
  amount = 1;
  boxId: any;
  boxDetails = new BoxDetails();
  isLoading: boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    private detailBoxService: DetailBoxService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.boxId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  openBox(): void {
    this.isLoading = true;
    this.isClicked = true;
    this.detailBoxService
      .openSingleBox(this.boxId, this.amount)
      .pipe(
        debounceTime(5000),
        takeUntil(this.onDestroy)
        // finalize(() => (this.isLoading = false))
      )
      .subscribe(
        (data) => {
          this.boxDetails = data.openBox.boxOpenings[0];
          console.log('boxDetails', this.boxDetails);
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
