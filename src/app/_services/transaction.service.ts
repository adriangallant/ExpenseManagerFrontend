import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';
import {Transaction} from '../_models/transaction';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class TransactionService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction, id: number): Observable<Transaction> {
    const properShares = transaction.shares;
    transaction.shares = [];
    for (let i = 0; i < properShares.length; i++){
      // @ts-ignore
      transaction.shares.push({
        partnerId: Number(properShares[i])
      });
    }
    transaction.userId = id;
    console.log(transaction);
    return this.http.post<Transaction>(`http://localhost:8080/api/v1/createTransaction`, transaction);
  }

  findAllTransactionsByUserId(userId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/v1/getAllTransactions/${userId}`);
  }

  getAccountStatement(userId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/v1/getStatement/${userId}`);
  }

  // checkTransactionType(transaction: Transaction) {
  //   if ( transaction.type === 'Expense' ){
  //     return transaction.amount = -Math.abs(transaction.amount);
  //   } else {
  //     return transaction.amount = Math.abs(transaction.amount);
  //   }
  // }
}
