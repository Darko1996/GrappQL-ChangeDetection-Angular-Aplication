import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/User';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { ToastrService } from 'ngx-toastr';

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
    // Don't need data to initially load, in order to invoke watchQuery needed to fake the data
    this.queryRef = this.apollo.watchQuery({
      query: gql`
        query {
          fakequery
        }
      `,
    });
  }

  ngOnInit(): void {
    this.subscribeWallet();
    this.executeLoad();
  }

  subscribeWallet(): void {
    this.queryRef.subscribeToMore({
      document: gql`
        subscription {
          updateWallet {
            wallet {
              id
              amount
              name
            }
          }
        }
      `,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        this.balance = subscriptionData.data.wallet.amount;
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
          console.log('this.userData', this.userData);
        }
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
