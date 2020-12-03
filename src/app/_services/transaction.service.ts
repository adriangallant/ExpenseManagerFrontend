import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';
import {Transaction} from '../_models/transaction';


@Injectable({providedIn: 'root'})
export class TransactionService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction, id: number) {
    transaction.amount = this.checkTransactionType(transaction);
    transaction.userId = id;
    return this.http.post<Transaction>(`http://localhost:8080/api/v1/createTransaction`, transaction);
  }

  findAllTransactionsByUserId(userId: number){
    return this.http.get<any>(`http://localhost:8080/api/v1/getAllTransactions/${userId}`);
  }

  checkTransactionType(transaction: Transaction) {
    if ( transaction.type === 'Expense' ){
      return transaction.amount = -Math.abs(transaction.amount);
    } else {
      return transaction.amount = Math.abs(transaction.amount);
    }
  }
}
