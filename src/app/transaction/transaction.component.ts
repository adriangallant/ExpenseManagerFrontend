import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Friend} from '../_models/friend';
import {TransactionService} from '../_services/transaction.service';
import {first} from 'rxjs/operators';

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
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transactionTitle: ['', Validators.required],
      transactionType: ['', Validators.required],
      transactionAmount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d{2}$/)]],
      transactionFriend: [''],
      receiptImage: ['']
    });
  }

  get f(){return this.transactionForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.alertService.clear();
    if (this.transactionForm.invalid){
      return;
    }
    this.loading = true;
    this.transactionService.createTransaction(this.transactionForm.value, this.authenticationService.currentUserValue.id)
      .pipe(first())
      .subscribe(
        data => {
          alert('Transaction created successfully!');
          this.transactionForm.reset();
        },
        error => {
          this.alertService.error(error);
        });
    this.loading = false;
    this.submitted = false;
  }

}
