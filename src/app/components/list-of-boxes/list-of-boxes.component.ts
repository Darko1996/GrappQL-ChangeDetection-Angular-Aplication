import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn],
})
export class ListOfBoxesComponent implements OnInit {
  allBoxes$: Observable<Box[]>;

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
    this.allBoxes$ = this.listOfBoxesService.getAllBoxes();
  }

  viewDetailBox(box: Box): void {
    this.router.navigate(['/detail-box', box.id]);
  }
}
