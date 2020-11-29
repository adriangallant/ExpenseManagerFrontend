import {User} from './user';
import {Account} from './account';

export class CompleteUser{
  account: Account;
  user: User;
  // token: string;
  constructor(user: User, account: Account) {
    this.account = account;
    this.user = user;
  }
}
