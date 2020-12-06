import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Transaction} from '../_models/transaction';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class TransactionService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  private url = `http://localhost:8080/api/v1`;

  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction, id: number): Observable<Transaction> {
    const properShares = transaction.shares;
    transaction.shares = [];
    for (const share of properShares){
      // @ts-ignore
      transaction.shares.push({
        partnerId: Number(share)
      });
    }
    transaction.userId = id;
    return this.http.post<Transaction>(`${this.url}/createTransaction`, transaction);
  }

  findAllTransactionsByUserId(userId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/getAllTransactions/${userId}`);
  }

  getAccountStatement(userId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/getStatement/${userId}`);
  }

  // checkTransactionType(transaction: Transaction) {
  //   if ( transaction.type === 'Expense' ){
  //     return transaction.amount = -Math.abs(transaction.amount);
  //   } else {
  //     return transaction.amount = Math.abs(transaction.amount);
  //   }
  // }
}
