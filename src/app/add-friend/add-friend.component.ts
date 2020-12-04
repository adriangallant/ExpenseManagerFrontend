import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

import { of, fromEvent } from 'rxjs';
import {debounceTime, map, distinctUntilChanged, filter, first} from 'rxjs/operators';

import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import {FriendsService} from '../_services/friends.service';
import {Friend} from '../_models/friend';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  @ViewChild('friendSearchInput', { static: true }) friendSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  loading: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private friendService: FriendsService
  ) {
    this.isSearching = false;
    this.apiResponse = [];
    this.loading = false;
  }

  ngOnInit(): void {
    // https://www.freakyjolly.com/angular-rxjs-debounce-time-optimize-search-for-server-response/#.X8PlS6pKg1I
    fromEvent(this.friendSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),
      // if character length greater then 2
      filter(res => res.length > 2),
      // Time in milliseconds between key events
      debounceTime(1000),
      // If previous query is different from current
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.friendService.searchGetCall(text).subscribe((res) => {
        this.isSearching = false;
        this.apiResponse = res;
      }, (err) => {
        this.isSearching = false;
        console.log('error', err);
      });
    });
  }

  addFriend(friendId: number) {
    this.loading = true;
    const friend = new Friend({
      userId: this.authenticationService.currentUserValue.id,
      friendId,
    });
    this.friendService.addFriend(friend)
      .pipe(first())
      .subscribe(
        data => {
            alert('Friend added successfully!');
            this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
