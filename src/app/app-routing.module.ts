import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailBoxComponent } from './components/detail-box/detail-box.component';
import { ListOfBoxesComponent } from './components/list-of-boxes/list-of-boxes.component';

const routes: Routes = [
  { path: '', component: ListOfBoxesComponent },
  { path: 'list-of-boxes', component: ListOfBoxesComponent },
  { path: 'detail-box/:id', component: DetailBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
