import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DetailBoxService {
  constructor(private apollo: Apollo) {}

  openSingleBox(boxId: string, amount: number): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation OpenBox($input: OpenBoxInput!) {
          openBox(input: $input) {
            boxOpenings {
              id
              itemVariant {
                id
                name
                value
              }
            }
          }
        }
      `,
      variables: {
        input: {
          boxId: boxId,
          amount: amount,
        },
      },
    });
  }
}
