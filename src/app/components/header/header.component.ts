import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { User } from '../../models/User';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { ToastrService } from 'ngx-toastr';

const dummy = gql`
  query {
    fakequery
  }
`;

const sub = gql`
  subscription {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
`;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  userData = new User();
  balance = 0;
  queryRef: QueryRef<any>;

  constructor(public authService: AuthService, private apollo: Apollo, private toastr: ToastrService) {
    this.queryRef = this.apollo.watchQuery({
      query: dummy,
    });
  }

  ngOnInit(): void {
    this.subscribeProduct();
    this.executeLoad();
  }

  subscribeProduct() {
    this.queryRef.subscribeToMore({
      document: sub,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
      },
    });
  }

  executeLoad(): void {
    this.authService.authUser.pipe(takeUntil(this.onDestroy)).subscribe(
      (data: User) => {
        if (data.id) {
          this.userData = data;
          this.userData?.wallets.forEach((e) => {
            this.balance += e.amount;
          });
        }
        console.log('this.userData', this.userData);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  submitLoginForm(): void {
    this.authService.login();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
