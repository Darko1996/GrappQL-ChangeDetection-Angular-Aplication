import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  userData = new User();
  balance = 0;
  queryRef: QueryRef<any>;

  constructor(
    public authService: AuthService,
    private apollo: Apollo,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  loginClick(): void {
    this.authService
      .login()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (data: User) => {
          if (data?.id) {
            this.userData = data;
            console.log('userData', this.userData);

            this.userData?.wallets.forEach((e) => {
              this.balance += e.amount;
            });
            this.changeDetectorRef.detectChanges();
          }
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
