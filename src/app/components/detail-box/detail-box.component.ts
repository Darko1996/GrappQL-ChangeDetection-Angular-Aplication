import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { DetailBoxService } from '../../services/detail-box.service';
import { BoxDetails } from '../../models/Box';
import { ToastrService } from 'ngx-toastr';
import { slideIn } from '../../animations';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss'],
  animations: [slideIn],
})
export class DetailBoxComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();
  isClicked: boolean;
  amount = 1;
  boxId: string;
  boxDetails = new BoxDetails();
  isLoading: boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    private detailBoxService: DetailBoxService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe((params) => {
      this.boxId = params['id'];
    });

    this.executeLoad();
  }

  executeLoad(): void {
    this.detailBoxService
      .openSingleBox(this.boxId, this.amount)
      .pipe(
        takeUntil(this.onDestroy),
        finalize(() => (this.isLoading = true))
      )
      .subscribe(
        (data: BoxDetails) => {
          this.boxDetails = data;
          console.log('boxDetails', this.boxDetails);
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }

  clickedEvent(): void {
    if (!this.isLoading) {
      this.isClicked = !this.isClicked;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
