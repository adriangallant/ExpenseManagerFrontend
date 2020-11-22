import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';


@Injectable({providedIn: 'root'})
export class UserService{
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) { }

  register(user: User) {
    //                  ${config.apiUrl}
    return this.http.post(`/users/register`, user);
  }

  updateAccount(user: User){
    return this.http.post(`/users/updateAccount`, user);
  }

  checkEmailExistence(email: string){
    return this.http.post<number>(`/users/checkEmailExistence`, email);
  }

  updatePassword(id, newPassword){
    return this.http.post(`/users/updatePassword`, { id, newPassword });
  }
}
// The user service contains a standard set of CRUD methods for managing users,
// it acts as the interface between the Angular application and the backend api.
