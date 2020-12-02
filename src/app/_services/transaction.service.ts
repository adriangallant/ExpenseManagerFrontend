import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';
import {Transaction} from '../_models/transaction';


@Injectable({providedIn: 'root'})
export class TransactionService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) {
  }

  createTransaction(transaction: Transaction, id: number){
    transaction.userId = id;
    return this.http.post(`/transactions/create`, transaction);
  }

  findAllTransactionsByUserId(userId: number){
    return this.http.post<Transaction[]>(`/transactions/findAllByUserId`, userId);
  }
}
