export class User {
  id: string;
  name: string;
  wallets: Wallets[];
}

export interface Wallets {
  id: string;
  amount: number;
  currency: string;
}

export interface UserResponse {
  currentUser: User;
}
