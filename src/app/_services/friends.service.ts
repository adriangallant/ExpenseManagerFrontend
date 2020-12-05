import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { of } from 'rxjs';

import {Friend} from '../_models/friend';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable({providedIn: 'root'})
export class FriendsService {
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(
    private http: HttpClient
  ) {
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http.get<any>(`http://localhost:8080/api/v1/getAllUsers/${term}`); // { params: PARAMS.set('search', term) }
  }

  addFriend(friend: Friend) {
    return this.http.post<Friend>(`http://localhost:8080/api/v1/addFriend`,  friend );
  }

  getAllFriendsByUserId(userId: number) {
    return this.http.get<any>(`http://localhost:8080/api/v1/getAllFriends/${userId}`);
  }
}
