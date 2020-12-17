import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs';

import {Friend} from '../_models/friend';

@Injectable({providedIn: 'root'})
export class FriendsService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  private localHostUrl: string;
  authUsername = 'user';
  authPassword = '123';

  constructor(
    private http: HttpClient
  ) {
    this.localHostUrl = `http://localhost:8080/api/v1`;
  }

  private awsUrl = `http://expensemanagerbackend-env.eba-btazwimb.us-east-2.elasticbeanstalk.com/api/v1`;


  searchGetCall(term: string): any{
    if (term === '') {
      return of([]);
    }
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.get<any>(`${this.awsUrl}/getAllUsers/${term}`, {headers}); // { params: PARAMS.set('search', term) }
  }

  addFriend(friend: Friend): any{
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.post<Friend>(`${this.awsUrl}/addFriend`,  friend, {headers});
  }

  getAllFriendsByUserId(userId: number): any{
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.get<any>(`${this.awsUrl}/getAllFriends/${userId}`, {headers});
  }
}
