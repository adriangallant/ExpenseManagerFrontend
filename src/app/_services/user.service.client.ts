import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({providedIn: 'root'})
export class UserService{

  private localHostUrl = `http://localhost:8080/api/v1`;

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) { }

  register(user: User) {
    //                  ${config.apiUrl}
    return this.http.post(`${this.localHostUrl}/createAccount`, user);
  }

  checkEmailExistence(email: string){
    return this.http.post<User>(`${this.localHostUrl}/forgot`, email);
  }

  update(user: User){
    return this.http.post(`${this.localHostUrl}/update`, user);
  }
}
// The user service contains a standard set of CRUD methods for managing users,
// it acts as the interface between the Angular application and the backend api.
