import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListOfBoxesComponent } from './components/list-of-boxes/list-of-boxes.component';
import { DetailBoxComponent } from './components/detail-box/detail-box.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './ngrx/app.reducer';
import { SharedLoaderComponent } from './components/shared/shared-loader/shared-loader.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListOfBoxesComponent, DetailBoxComponent, SharedLoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(fromApp.reducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
