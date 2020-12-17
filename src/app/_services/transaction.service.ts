import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Transaction} from '../_models/transaction';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class TransactionService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  private localHostUrl: string;
  private awsUrl = `http://expensemanagerbackend-env.eba-btazwimb.us-east-2.elasticbeanstalk.com/api/v1`;
  authUsername = 'user';
  authPassword = '123';

  constructor(private http: HttpClient) {
    this.localHostUrl = `http://localhost:8080/api/v1`;
  }

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
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.post<Transaction>(`${this.awsUrl}/createTransaction`, transaction, {headers});
  }

  findAllTransactionsByUserId(userId: number): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.get<any>(`${this.awsUrl}/getAllTransactions/${userId}`, {headers});
  }

  getAccountStatement(userId: number): Observable<any>{
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.get<any>(`${this.awsUrl}/getStatement/${userId}`, {headers});
  }

  // checkTransactionType(transaction: Transaction) {
  //   if ( transaction.type === 'Expense' ){
  //     return transaction.amount = -Math.abs(transaction.amount);
  //   } else {
  //     return transaction.amount = Math.abs(transaction.amount);
  //   }
  // }
}
