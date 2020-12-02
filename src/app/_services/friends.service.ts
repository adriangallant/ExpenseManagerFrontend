import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { User } from '../_models/user';
import {of} from 'rxjs';

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
    return this.http.post(`/users/getUsersBySearch`, term); // { params: PARAMS.set('search', term) }
  }
}
