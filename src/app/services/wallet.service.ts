import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Box } from '../models/Box';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private apollo: Apollo) {}

  updateWalletListener(): Observable<any> {
    return this.apollo.subscribe<any>({
      query: gql`
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
    });
  }
}
