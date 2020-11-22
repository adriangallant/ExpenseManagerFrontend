import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service.client';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Friend} from '../_models/friend';

interface TransactionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  loading = false;
  submitted = false;

  transactionTypes: TransactionType[] = [
    {value: 'Expense', viewValue: 'Expense'},
    {value: 'Income', viewValue: 'Income'}
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transactionTitle: ['', Validators.required],
      transactionType: ['', Validators.required],
      transactionAmount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      transactionFriend: [''],
      receiptImage: ['']
    });
  }

  get f(){ return this.transactionForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.alertService.clear();
    if (this.transactionForm.invalid){
      return;
    }
    this.loading = true;
    alert('this worked');
    this.loading = false;
    this.submitted = false;
  }

}
