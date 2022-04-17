import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { map, Observable } from 'rxjs';
import { User, UserResponse } from '../models/User';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(): Observable<User> {
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
      .valueChanges.pipe(
        map((resultArray) => {
          return resultArray.data.currentUser;
        })
      );
  }
}
