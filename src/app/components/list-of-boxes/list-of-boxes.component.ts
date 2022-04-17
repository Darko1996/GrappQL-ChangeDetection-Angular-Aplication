import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Box } from '../../models/Box';
import { Router } from '@angular/router';
import { ListOfBoxesService } from '../../services/list-of-boxes.service';
import { ToastrService } from 'ngx-toastr';
import { slideIn } from '../../animations';
import { SharedLoaderService } from '../../services/shared-loader.service';

@Component({
  selector: 'app-list-of-boxes',
  templateUrl: './list-of-boxes.component.html',
  styleUrls: ['./list-of-boxes.component.scss'],
  animations: [slideIn],
})
export class ListOfBoxesComponent implements OnInit, OnDestroy {
  onDestroy = new Subject();
  allBoxes: Box[];

  constructor(
    public router: Router,
    private listOfBoxesService: ListOfBoxesService,
    private toastr: ToastrService,
    private loader: SharedLoaderService
  ) {}

  ngOnInit(): void {
    this.executeLoad();
  }

  executeLoad(): void {
    this.loader.showFullLoader();
    this.listOfBoxesService
      .getAllBoxes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (data: Box[]) => {
          this.allBoxes = data;
          this.loader.dismissLoader();
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }

  viewDetailBox(box: Box): void {
    this.router.navigate(['/detail-box', box.id], { queryParams: { id: box.id } });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
