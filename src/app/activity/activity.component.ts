import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import {TransactionService} from '../_services/transaction.service';
import {Transaction} from '../_models/transaction';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  loading = false;
  submitted = false;
  loadingActivity: boolean;

  activities: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadingActivity = true;
  }

  ngOnInit(): void {
    this.initializeActivity();
  }

  ngAfterViewInit(): void{
    this.cdr.detectChanges();
  }

  initializeActivity(){
     this.transactionService.findAllTransactionsByUserId(this.authenticationService.currentUserValue.id)
      .subscribe(value => this.activities = value);
  }

  checkActivityLength(){
    this.loadingActivity = false;
    return this.activities.length > 0;
  }
}
