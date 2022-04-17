import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { User, UserResponse } from '../models/User';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser = new BehaviorSubject<User>(new User());

  constructor(private apollo: Apollo) {}

  login(): Subscription {
    return this.apollo
      .watchQuery<UserResponse>({
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
