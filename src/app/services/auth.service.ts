import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser = new BehaviorSubject<User>(new User());

  constructor(private apollo: Apollo) {}

  login(): Subscription {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            currentUser {
              id
              name
              wallets {
                id
                amount
                currency
              }
            }
          }
        `,
      })
      .valueChanges.pipe(take(1))
      .subscribe((resultArray) => {
        this.authUser.next(resultArray.data.currentUser);
      });
  }
}
