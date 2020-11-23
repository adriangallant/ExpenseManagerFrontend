import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  loading = false;
  submitted = false;

  activity: [];

  constructor() { }

  ngOnInit(): void {
  }

}
