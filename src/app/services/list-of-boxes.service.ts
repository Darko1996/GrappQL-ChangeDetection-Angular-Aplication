import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Box } from '../models/Box';

@Injectable({
  providedIn: 'root',
})
export class ListOfBoxesService {
  constructor(private apollo: Apollo) {}

  getAllBoxes(): Observable<Box[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            boxes(free: true, openable: true, purchasable: true) {
              edges {
                node {
                  id
                  name
                  iconUrl
                  cost
                }
              }
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((resultArray) => {
          return resultArray.data.boxes.edges.map((result: any) => result.node);
        })
      );
  }
}
