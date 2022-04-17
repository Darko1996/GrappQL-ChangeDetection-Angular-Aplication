export interface Box {
  id: string;
  name: string;
  iconUrl: string;
  cost: number;
}

export class BoxDetails {
  id: string;

  itemVariant: {
    id: string;
    name: string;
    value: number;
  };
}

export interface BoxResponse {
  boxes: {
    edges: [
      {
        node: Box;
        __typename: string;
      }
    ];
  };
}
