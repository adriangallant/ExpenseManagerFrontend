import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({providedIn: 'root'})
export class UserService{

  private localHostUrl: string;
  private awsUrl = `http://expensemanagerbackend-env.eba-btazwimb.us-east-2.elasticbeanstalk.com/api/v1`;
  authUsername = 'user';
  authPassword = '123';

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  constructor(private http: HttpClient) {
    this.localHostUrl = `http://localhost:8080/api/v1`;
  }

  register(user: User) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.post(`${this.awsUrl}/createAccount`, user, {headers});
  }

  checkEmailExistence(email: string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.post<User>(`${this.awsUrl}/forgot`, email, {headers});
  }

  update(user: User){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.authUsername + ':' + this.authPassword)});
    return this.http.post(`${this.awsUrl}/update`, user, {headers});
  }
}
// The user service contains a standard set of CRUD methods for managing users,
// it acts as the interface between the Angular application and the backend api.
