import { Component, OnInit } from '@angular/core';
import {Friend} from '../_models/friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  loading = false;
  submitted = false;

  friends: Friend[];

  constructor() { }

  ngOnInit(): void {
  }

}
